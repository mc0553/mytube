
$(document).ready(function () {

    $('#search-btn').on('click',function(){

      $('main').empty();
        let inputTask = $('#search-word').val();
        let key = 'ここにGoogleのキー挿入';
        let URL = 'https://www.googleapis.com/youtube/v3/search';

        let options = {
          part: 'snippet, id',
          key: key,
          type: 'video',
          maxResults: 50,
          order: "viewCount",
          publishedAfter: "2010-01-01T00:00:00Z",
          q: inputTask,
        }
    
        loadVids();
        function loadVids() {
          $.getJSON(URL, options, function (data) {
              let id = data.items[0].id.videoId;
              mainVid(id);
              resultsLoop(data);
          });
        }
    
        function mainVid(id) {
          $('#video').html(`<iframe width="560" height="280" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
        }
    
        function resultsLoop(data) {
    
            $.each(data.items, function (i, item) {
                let thumb = item.snippet.thumbnails.medium.url;
                let title = item.snippet.title;
                let desc = item.snippet.description.substring(0, 100);
                let vid = item.id.videoId;
                $('main').append(`
                    <article class="item" data-key="${vid}">
                      <img src="${thumb}" alt="" class="thumb">
                      <div class="details">
                        <h4>${title}</h4>
                        <p>${desc}</p>
                      </div>
                    </article>
                `);
            });
        }
    })

    // CLICK EVENT
    $('main').on('click', 'article', function () {
        let idMain = $(this).attr('data-key');   
        $('#video').html(`<iframe width="560" height="280" src="https://www.youtube.com/embed/${idMain}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          `);
    });
    
});
