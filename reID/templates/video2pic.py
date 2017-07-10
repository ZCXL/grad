import cv2
import subprocess as sp



#获得视频的格式
videoCapture = cv2.VideoCapture('Pedestrian Safety Video.mp4')

#获得码率及尺寸
fps = videoCapture.get(cv2.CAP_PROP_FPS)
size = (int(videoCapture.get(cv2.CAP_PROP_FRAME_WIDTH)),
        int(videoCapture.get(cv2.CAP_PROP_FRAME_HEIGHT)))

totalFrameNumber = videoCapture.get(cv2.CAP_PROP_FRAME_COUNT);  


#size = (500, 720)
print(fps)
print(size)
print(totalFrameNumber)
#指定写视频的格式, I420-avi, MJPG-mp4
#videoWriter = cv2.VideoWriter('oto_other.mp4', cv2.cv.CV_FOURCC('M', 'J', 'P', 'G'), fps, size)
#读帧

frameToStart = 480
videoCapture.set(cv2.CAP_PROP_POS_FRAMES, frameToStart)

frameToStop = 2400

success, frame = videoCapture.read()
cnt = 11
while success :

    #cv2.imshow(Oto Video, frame) #显示
    #cv2.waitKey(int(1000 / int(fps))) #延迟
    #videoWriter.write(frame) #写视频帧
    #print(cnt)
    if (frameToStart % 5 == 0):
    	cv2.imwrite('%d'%cnt + '.jpg', frame)
    	cnt += 1

    if (cnt > 17):
    	break

    frameToStart += 1
    success, frame = videoCapture.read() #获取下一帧

videoCapture.release()
