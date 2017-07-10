from django.shortcuts import render
from django.http import JsonResponse
from reID.models import Rectangle
from reID.models import TreeEdge
from django.db.models import Max

edge = {}

# Create your views here.


def home(request):
    nodes = Rectangle.objects.all().only('id')
    # print(list(res))

    for node in nodes:
        edge[node.id] = {}

    tree_edges = TreeEdge.objects.all()
    for tree_edge in tree_edges:
        edge[tree_edge.st][tree_edge.ed] = tree_edge.val
        edge[tree_edge.ed][tree_edge.st] = tree_edge.val

    print(edge)

    return render(request, 'home.html')


def build_edge(node1, node2, val):
    new_edge = TreeEdge(st=node1, ed=node2, val=val)
    new_edge.save()

    edge[node1][node2] = val
    edge[node2][node1] = val


def delete_edge(node1, node2):
    edge[node1].pop(node2)
    edge[node2].pop(node1)
    del_edge = TreeEdge.objects.filter(st=node1, ed=node2)
    if del_edge.exists():
        del_edge.delete()
    del_edge = TreeEdge.objects.filter(st=node2, ed=node1)
    if del_edge.exists():
        del_edge.delete()


def person_in_frame(request):
    # name_dict = {'twz': str(request.POST['video']) + 'Love python and Django', 'zqxt': 'I am teaching Django'}
    vNum = request.POST['video']
    fNum = request.POST['frameNum']
    # .values('top', 'left', 'height', 'width')
    res = Rectangle.objects.filter(video=vNum, frameNum=fNum).values()

    # res = Rectangle.objects.all().values()
    # rect_dict = {}
    # cnt = 0

    # for rect in res:
    # cnt+=1
    # rect_dict[cnt]= rect

    return JsonResponse(list(res), safe=False)


def insert_person(request):

    rect = Rectangle(frameNum=request.POST['frameNum'])
    rect.video = request.POST['video']
    rect.top = request.POST['top']
    rect.left = request.POST['left']
    rect.height = request.POST['height']
    rect.width = request.POST['width']
    rect.personID = 0

    res = Rectangle.objects.all().only('personID')

    if res.exists():
        rect.personID = res.aggregate(Max('personID'))['personID__max'] + 1

    rect.save()

    edge[rect.id] = {}

    return JsonResponse({'personID': rect.personID})


def del_person(request):
    video = request.POST['video']
    frameNum = request.POST['frameNum']
    personID = request.POST['personID']

    res = Rectangle.objects.filter(
        video=video, frameNum=frameNum, personID=personID)
    print(res)

    for node in res:
        st = node.id
        print(st)
        print(edge[st])
        children = []
        for ed in edge[st]:
            children.append(ed)

        for child in children[1:]:
            build_edge(children[0], child, edge[st][child])

        for child in children:
            delete_edge(st, child)

        edge.pop(st)

        res.delete()

    # print(edge)

    return JsonResponse({'deleted': True})


def union_person(request):
    frameNum1 = request.POST['frameNum1']
    personID1 = request.POST['personID1']
    frameNum2 = request.POST['frameNum2']
    personID2 = request.POST['personID2']

    if personID1 == personID2:
        return JsonResponse({'deleted': -999999})

    node1 = Rectangle.objects.get(
        video=1, frameNum=frameNum1, personID=personID1).id
    node2 = Rectangle.objects.get(
        video=2, frameNum=frameNum2, personID=personID2).id

    res1 = Rectangle.objects.filter(personID=personID1)
    res2 = Rectangle.objects.filter(personID=personID2)
    # print(res1)
    print(res1.count())
    print(res2.count())

    deleted = 0
    if res1.count() < res2.count() or (res1.count() == res2.count() and personID1 > personID2):
        res1.update(personID=personID2)
        deleted = 0
    else:
        res2.update(personID=personID1)
        deleted = 1
    # Example.objects.filter(id=481).update(total_calories=10)

    val = 0
    res = TreeEdge.objects.all().only('val')
    if res.exists():
        val = res.aggregate(Max('val'))['val__max'] + 1

    build_edge(node1, node2, val)
    print(edge)

    return JsonResponse({'deleted': deleted})


def find_max(x, dest, visited):
    visited.add(x)
    ans = {}
    print(x)
    for (ed, val) in edge[x].items():
        if (ed == dest):
            return{'st': x, 'ed': ed, 'val': val}
        if ed not in visited:
            res = find_max(ed, dest, visited)
            if 'val' in res:
                ans = res
                if val > ans['val']:
                    ans = {'st': x, 'ed': ed, 'val': val}

    return ans


def get_same_person_set(x, same_person):
    if x in same_person:
        return
    same_person.add(x)
    for ed in edge[x]:
        get_same_person_set(ed, same_person)


def breakdown_person(request):
    frameNum1 = request.POST['frameNum1']
    personID1 = request.POST['personID1']
    frameNum2 = request.POST['frameNum2']
    personID2 = request.POST['personID2']

    if personID1 != personID2:
        return JsonResponse({'newID': -999999})

    node1 = Rectangle.objects.get(
        video=1, frameNum=frameNum1, personID=personID1).id
    node2 = Rectangle.objects.get(
        video=2, frameNum=frameNum2, personID=personID2).id

    print(edge)
    # print(type(node1))
    visited = set()
    del_edge = find_max(node1, node2, visited)
    print(str(node1) + ' ' + str(node2))
    print(del_edge)
    # return JsonResponse({'newID': -1111})

    delete_edge(del_edge['st'], del_edge['ed'])
    print(edge)
    same_person = set()
    get_same_person_set(node2, same_person)

    print(del_edge)
    print(same_person)

    newID = Rectangle.objects.all().only('personID').aggregate(
        Max('personID'))['personID__max'] + 1

    for node in same_person:
        res = Rectangle.objects.filter(id=node)
        res.update(personID=newID)

    return JsonResponse({'newID': newID})


def update_position(request):
    video = request.POST['video']
    frameNum = request.POST['frameNum']
    personID = request.POST['personID']

    res = Rectangle.objects.get(
        video=video, frameNum=frameNum, personID=personID)
    print(res)

    res.top = request.POST['top']
    res.left = request.POST['left']
    res.height = request.POST['height']
    res.width = request.POST['width']
    res.save()

    # print(edge)

    return JsonResponse({'updated': True})
