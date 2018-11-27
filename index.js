const YOUTUBE_KEY = "AIzaSyDzI7kC9s2mU8xzfAbxlXPdZEs162-wV_U";
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function getDataFromApi(callback) {
  $.getJSON(
    YOUTUBE_SEARCH_URL,
    {
      part: "snippet",
      q: "Cats",
      maxResults: 5,
      key: YOUTUBE_KEY
    },
    data => {
      return data.items.map((item, index) => {
        // console.log(item);
        const link = "https://www.youtube.com/watch?v=";
        const { url, height, width } = item.snippet.thumbnails.default;

        $(".js-search-results").append(`
    <div>
    <a href=${link + item.id.videoId}>
    <img src=${url} width=${width} height=${height}>
    ${item.snippet.title}
    </a>
    </div>
    `);
      });
    }
  );
}

function watchSubmit() {
  $(".js-search-form").submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find(".js-query");
    const query = queryTarget.val();
    queryTarget.val("");
    // console.log(query);
    getDataFromApi(query);
  });
}

$(watchSubmit);
