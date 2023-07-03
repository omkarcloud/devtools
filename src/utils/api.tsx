import _ from 'lodash'
import AxiosInstance from './axios'


function downloadViaLink(filename) {
  return response => {
    // create a Blob from the response data
    const url = window.URL.createObjectURL(new Blob([response.data]))
    // create a link element
    const link = document.createElement('a')
    // set the link's href to the URL created above
    link.href = url
    // set the link's download attribute to the desired file name
    link.setAttribute('download', filename)
    // append the link to the body and trigger the download
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

async function getSubtitles(url: any) {
  return AxiosInstance.get('/tools/youtube-subtitles/', {
    message: 'Getting Subtitles',
    params: {
      url,
    },
  })
}


async function downloadPlaylistVideosJson(url: any) {
  return AxiosInstance.get('/tools/youtube-playlist-json/', {
    message: 'Downloading Playlist Videos',

    params: {
      url,
    },
    responseType: 'blob'

  }).then(downloadViaLink('videos.json'))
}


async function downloadYoutubeThumbnail(url: any) {
  return AxiosInstance.get('/tools/youtube-thumbnail/', {
    message: 'Downloading Video thumbnail',

    params: {
      url,
    },
    responseType: 'blob'

  }).then(downloadViaLink('thumbnail.jpg'))
}

async function downloadSubtitles(url: any) {
  return AxiosInstance.get('/tools/youtube-subtitles/download/', {
    message: 'Downloading Subtitles',

    params: {
      url,
    },
    responseType: 'blob'

  }).then(downloadViaLink('subtitles.srt'))
}
async function trackAction(type, payload) {
  return AxiosInstance.post(`/actions/`, {type,  data:payload}, {
    silent: true,
  }).catch(console.error)
}

const Api = {
  getSubtitles,
  downloadSubtitles,
  downloadPlaylistVideosJson, 
  downloadYoutubeThumbnail,
  trackAction,
}


export default Api
