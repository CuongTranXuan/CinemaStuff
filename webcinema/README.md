ffmpeg -i fate_ep20.mkv -i sub.vtt \
    -c:v libx264 -crf 21 -preset veryfast \
    -c:a aac -b:a 128k -ac 2 \
	-start_number 0 \
    -f hls -hls_time 4 -hls_playlist_type event \
	-hls_flags independent_segments \
	-hls_flags round_durations \
	 stream.m3u8


//create sub file

ffmpeg -i fate_ep20.mkv -map 0:2 -f webvtt sub.vtt


ffmpeg -i fate_ep20.mkv -i fate_ep20.vtt \
  -preset veryfast -g 48 -sc_threshold 0 \
  -map 0:0 -map 0:1 -map 1:0 \
  -s:v:0 1920x1080 -c:v:0 libx264 -b:v:0  8120k \
  -c:a copy \
  -c:s copy \
  -var_stream_map v:0,a:0,s:0,sgroup:subs \
  -master_pl_name master_fate_ep20.m3u8 \
  -f hls -hls_time 6 -hls_list_size 0 -hls_playlist_type vod \
  -hls_segment_filename "fate_ep20_v%v/seq_%d.ts" \
  fate_ep20_v%v/index.m3u8
  


  file and folder rule: 
  + fate_ep%d.mkv, sub_{videoname}.vtt
  + stream file: 
    + master_{videoname}.m3u8 
        + {videoname}_v0 //fhd
            + seq_%d
            + subtitle name default