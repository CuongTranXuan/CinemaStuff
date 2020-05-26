# technology stack
1. Nginx + nginx-rtmp-module
2. FFmpeg (nightly newest build)
3. HLS streaming
4. NodeJS server to capture info


# install nodejs + mongodb 



 mongoimport --host localhost --db StreamAPIServer --collection films --file ./data.json 



# install nginx
1. preinstall nginx
    sudo apt update
    sudo apt install -y build-essential git tree
    wget https://nginx.org/download/nginx-1.15.0.tar.gz && tar zxvf nginx-1.15.0.tar.gz
    wget https://ftp.pcre.org/pub/pcre/pcre-8.40.tar.gz
    tar xzvf pcre-8.40.tar.gz
    wget http://www.zlib.net/zlib-1.2.11.tar.gz
    tar xzvf zlib-1.2.11.tar.gz
    wget https://www.openssl.org/source/openssl-1.1.0f.tar.gz
    tar xzvf openssl-1.1.0f.tar.gz


    sudo add-apt-repository -y ppa:maxmind/ppa
    sudo apt update && sudo apt upgrade -y 
    sudo apt install -y perl libperl-dev libgd3 libgd-dev libgeoip1 libgeoip-dev geoip-bin libxml2 libxml2-dev libxslt1.1 libxslt1-dev

    git clone https://github.com/sergey-dryabzhinsky/nginx-rtmp-module.git
2. build nginx from source
    cd ~/nginx-1.15.0
    sudo cp ~/nginx-1.15.0/man/nginx.8 /usr/share/man/man8
    sudo gzip /usr/share/man/man8/nginx.8
    ls /usr/share/man/man8/ | grep nginx.8.gz
    # Check that Man page for NGINX is working:
    man nginx


    ./configure --prefix=/usr/share/nginx \
            --sbin-path=/usr/sbin/nginx \
            --modules-path=/usr/lib/nginx/modules \
            --conf-path=/etc/nginx/nginx.conf \
            --error-log-path=/var/log/nginx/error.log \
            --http-log-path=/var/log/nginx/access.log \
            --pid-path=/run/nginx.pid \
            --lock-path=/var/lock/nginx.lock \
            --user=www-data \
            --group=www-data \
            --build=Ubuntu \
            --http-client-body-temp-path=/var/lib/nginx/body \
            --http-fastcgi-temp-path=/var/lib/nginx/fastcgi \
            --http-proxy-temp-path=/var/lib/nginx/proxy \
            --http-scgi-temp-path=/var/lib/nginx/scgi \
            --http-uwsgi-temp-path=/var/lib/nginx/uwsgi \
            --with-openssl=../openssl-1.1.0f \
            --with-openssl-opt=enable-ec_nistp_64_gcc_128 \
            --with-openssl-opt=no-nextprotoneg \
            --with-openssl-opt=no-weak-ssl-ciphers \
            --with-openssl-opt=no-ssl3 \
            --with-pcre=../pcre-8.40 \
            --with-pcre-jit \
            --with-zlib=../zlib-1.2.11 \
            --with-compat \
            --with-file-aio \
            --with-threads \
            --with-http_addition_module \
            --with-http_auth_request_module \
            --with-http_dav_module \
            --with-http_flv_module \
            --with-http_gunzip_module \
            --with-http_gzip_static_module \
            --with-http_mp4_module \
            --with-http_random_index_module \
            --with-http_realip_module \
            --with-http_slice_module \
            --with-http_ssl_module \
            --with-http_sub_module \
            --with-http_stub_status_module \
            --with-http_v2_module \
            --with-http_secure_link_module \
            --with-mail \
            --with-mail_ssl_module \
            --with-stream \
            --with-stream_realip_module \
            --with-stream_ssl_module \
            --with-stream_ssl_preread_module \
            --with-debug \
            --add-module='../nginx-rtmp-module' \

    sudo make
    sudo make install


    link modules nginx: sudo ln -s /usr/lib/nginx/modules /etc/nginx/modules


    # Create NGINX system group and user:
    sudo adduser --system --home /nonexistent --shell /bin/false --no-create-home --disabled-login --disabled-password --gecos "nginx user" --group nginx

    # Create NGINX cache directories and set proper permissions
    sudo mkdir -p /var/cache/nginx/client_temp /var/cache/nginx/fastcgi_temp /var/cache/nginx/proxy_temp /var/cache/nginx/scgi_temp /var/cache/nginx/uwsgi_temp
    sudo chmod 700 /var/cache/nginx/*
    sudo chown nginx:root /var/cache/nginx/*

    # Create NGINX systemd unit file:
    sudo vim /etc/systemd/system/nginx.service


    Copy/paste the below content into /etc/systemd/system/nginx.service file:

        [Unit]
        Description=nginx - high performance web server
        Documentation=https://nginx.org/en/docs/
        After=network-online.target remote-fs.target nss-lookup.target
        Wants=network-online.target

        [Service]
        Type=forking
        PIDFile=/var/run/nginx.pid
        ExecStartPre=/usr/sbin/nginx -t -c /etc/nginx/nginx.conf
        ExecStart=/usr/sbin/nginx -c /etc/nginx/nginx.conf
        ExecReload=/bin/kill -s HUP $MAINPID
        ExecStop=/bin/kill -s TERM $MAINPID

        [Install]
        WantedBy=multi-user.target

    # Enable NGINX to start on boot and start NGINX immediately:

    sudo systemctl enable nginx.service
    sudo systemctl start nginx.service
# ffmpeg test code stream to link app 
sudo ffmpeg -i video3.mp4 -profile:v baseline -level 3.0 -s 720x400 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls /home/gckm1/Videos/stream.m3u8


ffmpeg -i fate_ep20.mkv \
    -filter_complex "[v:0]split=2[vtemp001][vout002];[vtemp001]scale=w=480:h=360[vout001]" \
    -preset veryfast -g 60 -sc_threshold 0 \
    -map [vout001] -c:v:0 libx264 -b:v:0 3500k -c:a aac -b:a 128k -ac 2 -maxrate:v:0 3700k -bufsize:v:0 4000k\
    -map [vout002] -c:v:1 libx264 -b:v:1 6000k -c:a aac -b:a 128k -ac 2 -maxrate:v:1 6600k -bufsize:v:1 8000k\
    -map a:0 -c:a aac -b:a 128k -ac 2 \
    -map a:0 -c:a aac -b:a 128k -ac 2 \
    -f hls -hls_time 4 -hls_playlist_type event -hls_flags independent_segments \
    -master_pl_name master_fate_ep20.m3u8 \
    -hls_segment_filename stream_%v/data%06d.ts  \
    -use_localtime_mkdir 1 \
    -var_stream_map "v:0,a:0,s:0 v:1,a:1,s:0" \
stream_%v_fate_ep20.m3u8






note: for each videox.mp4/mkv file, we then have following structure

master_videox.m3u8 // contain both playlist for HD quality and FullHD
stream_v%_videox.m3u8 // 2 different quality stream
v% = 0 : HD
v% = 1 : FullHD