# requirements
    Ubuntu 18.04
    FFmpeg newest nightly build
    Nodejs v11.1 + npm 
    MongoDB
    nginx 1.17 
# install NodeJS via nvm 
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
    nvm install 11.1 (NodeJS v11.1 + npm)
    sudo apt install gcc g++ make (for further native add-ons) 
# install ffmpeg from source

    Remove any existing packages:

    sudo apt -y  remove ffmpeg x264 libav-tools libvpx-dev libx264-dev
    Get the dependencies (Ubuntu Desktop users):

    sudo apt-get update
    sudo apt-get -y install build-essential checkinstall git libfaac-dev libgpac-dev \
    libjack-jackd2-dev libmp3lame-dev libopencore-amrnb-dev libopencore-amrwb-dev \
    librtmp-dev libsdl1.2-dev libtheora-dev libva-dev libvdpau-dev libvorbis-dev \
    libx11-dev libxfixes-dev pkg-config texi2html yasm zlib1g-dev

    Install Yasm, Nasm: 

    cd ~/ffmpeg_sources
    wget http://www.tortall.net/projects/yasm/releases/yasm-1.3.0.tar.gz
    tar xzvf yasm-1.3.0.tar.gz
    cd yasm-1.3.0
    ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin"
    make
    make install

    sudo apt-get install autoconf autogen
    cd ~/ffmpeg_sources
    wget http://www.nasm.us/pub/nasm/releasebuilds/2.13.01/nasm-2.13.01.tar.bz2
    tar xjvf nasm-2.13.01.tar.bz2
    cd nasm-2.13.01
    ./autogen.sh
    PATH="$HOME/bin:$PATH" ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin"
    PATH="$HOME/bin:$PATH" make
    make install


    libx264 | H.264 video encoder + tons of library

    sudo apt-get install libx264-dev libx265-dev libfdk-aac-dev libmp3lame-dev libopus-dev libvpx-dev libass-dev libssl-dev libnuma-dev

    librtmp compile from source : 
    git clone https://github.com/MonaSolutions/librtmfp.git --depth=1
    cd /librtmfp
    sudo make && sudo make install



    cd ~/ffmpeg_sources
    git clone --depth 1 https://git.ffmpeg.org/ffmpeg.git
    cd ffmpeg
    PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure \
    --prefix="$HOME/ffmpeg_build" \
    --pkg-config-flags="--static" \
    --extra-cflags="-I$HOME/ffmpeg_build/include" \
    --extra-ldflags="-L$HOME/ffmpeg_build/lib" \
    --bindir="$HOME/bin" \
    --enable-openssl \
    --enable-gpl \
    --enable-libass \
    --enable-libfdk-aac \
    --enable-libfreetype \
    --enable-libmp3lame \
    --enable-libopencore-amrnb \
    --enable-libopencore-amrwb \
    --enable-librtmp \
    --enable-libopus \
    --enable-libtheora \
    --enable-libvorbis \
    --enable-libvpx \
    --enable-libx264 \
    --enable-libx265 \
    --enable-nonfree \
    --enable-version3 \
    --enable-libxcb
    PATH="$HOME/bin:$PATH" make
    make install
    hash -r


# MongoDB Community 
    sudo apt update
    sudo apt install -y mongodb
    mongoimport --host localhost --db StreamAPIServer --collection films --file ./perfect.json 
# install nginx
1. preinstall nginx
    sudo apt update
    sudo apt install -y build-essential git tree
    wget https://nginx.org/download/nginx-1.17.0.tar.gz && tar zxvf nginx-1.17.0.tar.gz
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
    cd ~/nginx-1.17.0
    sudo cp ~/nginx-1.17.0/man/nginx.8 /usr/share/man/man8
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