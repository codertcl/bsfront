FROM nginx:stable-alpine
MAINTAINER 2635633080@qq.com
ADD dist.tar.gz /data/html
EXPOSE 80
CMD ["nginx","-g", "daemon off;"]
