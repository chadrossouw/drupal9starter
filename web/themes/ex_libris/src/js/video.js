    
  const video = () =>{
  function getIdFromUrl(url){
    const vidRegex  = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    return url.match(vidRegex)[1];
   }
   
   
  
  const videoDiv = document.querySelector('#player');
  const footer = document.querySelector('#block-slideinmessage');
  if (videoDiv){ 
    const windowWidth = window.innerWidth;
    const videoID = getIdFromUrl(videoDiv.dataset.id);
    let videoWidth = 480;
    let videoHeight = 270;
    var firstFeatureID;
    if (loggedIn==false){
      const videoFeaturedURLs = document.querySelectorAll(".front_featured-video__button");
      videoFeaturedURLs[0].classList.add("now-playing");
      firstFeatureID = getIdFromUrl(videoFeaturedURLs[0].dataset.id);
          videoFeaturedURLs.forEach(url=>{
          url.addEventListener('click',clickVideoLink)
      })
      function clickVideoLink(e){
          e.preventDefault();
          videoFeaturedURLs.forEach(url => url.classList.remove("now-playing"));
          e.target.parentNode.classList.add("now-playing");
          let loadFeaturedId = getIdFromUrl(this.dataset.id);
          player2.loadVideoById({'videoId':loadFeaturedId});
      }
    }
    if(windowWidth<1024){
      videoWidth = 320;
      videoHeight = 180;
    }
    
    var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;
        var player2;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
            height: videoHeight,
            width: videoWidth,
            videoId: videoID,
            playerVars: { 
              rel:0,
              modestbranding: 1,
          },
            events: {
              'onReady': onPlayerReady,
            
            }
          });
          if(loggedIn==false){
          player2 = new YT.Player('player2',{
                height: videoHeight,
                width: videoWidth,
                videoId: firstFeatureID,
                playerVars: { 
                    rel:0,
                    modestbranding: 1,
                    },
                    events: {
                      'onStateChange': onPlayerStateChange,
                    
                    }
            })
          }
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
         /* event.target.playVideo();*/
        }
        function onPlayerStateChange(event){
          if (event.data == 0||event.data==2){
            footer.classList.add('slideIn');
            setTimeout(()=>{footer.classList.remove('slideIn')}, 5000)
          }
          else{
            footer.classList.remove('slideIn');
          }
        }
    }
      
  }

  export default video;