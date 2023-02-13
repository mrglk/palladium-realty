import { Loader } from 'google-maps';
import { getPageLang, isWindowSizeSmallerThen } from './utils/helpers';

const center = { lat: 25.1624427, lng: 55.2226371 };
let timeoutId = null;
let map;

const mapPointsData = {
  en: [
    {
      id: 1,
      title: 'Bluewaters',
      price: '$ 1,789,000',
      beach: '100 meters',
      developer: 'MERAAS',
      type: 'Apartment',
      area: '180 million sq. ft.',
      lat: 25.079880,
      lng: 55.121824,
      img: '/img/map/blue-waters.jpg',
    },
    {
      id: 2,
      title: 'Palm Jumeirah',
      price: '$ 976,000',
      beach: '100 meters',
      developer: 'Nakheel',
      type: 'Apartment / Villas',
      area: '180 million sq. ft.',
      lat: 25.115271,
      lng: 55.137262,
      img: '/img/map/palm-jumeirah.jpg',
    },
    {
      id: 3,
      title: 'Dubai Marina & Jumeirah Lake Towers',
      price: '$ 1,239,000',
      beach: '500 meters',
      developer: 'Omniyat',
      type: 'Apartment',
      area: '180 million sq. ft.',
      lat: 25.076717,
      lng: 55.139962,
      img: '/img/map/dubai-marina.jpg',
    },
    {
      id: 4,
      title: 'Downtown Dubai & Business Bay',
      price: '$ 1,139,000',
      beach: '2.7 kilometers',
      developer: 'EMAAR',
      type: 'Apartment',
      area: '180 million sq. ft.',
      lat: 25.193920,
      lng: 55.275184,
      img: '/img/map/down-town-dubai.jpg',
    },
    {
      id: 5,
      title: 'Creek Harbour',
      price: '$ 799,000',
      beach: '10 kilometers',
      developer: 'Sobha',
      type: 'Apartment',
      area: '180 million sq. ft.',
      lat: 25.202958,
      lng: 55.350099,
      img: '/img/map/creek-harbour.jpg',
    },
    {
      id: 6,
      title: 'City Walk',
      price: '$ 1,529,000',
      beach: '900 meters',
      developer: 'Ahad',
      type: 'Apartment',
      area: '180 million sq. ft.',
      lat: 25.205565,
      lng: 55.263697,
      img: '/img/map/city-walk.jpg',
    },
    {
      id: 7,
      title: 'Jumeirah Village Circle & Triangle',
      price: '$ 689,000',
      beach: '6.5 kilometers',
      developer: 'Al Habtoor',
      type: 'Apartment / Villas',
      area: '180 million sq. ft.',
      lat: 25.060415,
      lng: 55.208744,
      img: '/img/map/jumeirah-village-circle.jpg',
    },
    {
      id: 8,
      title: 'Dubai Hills',
      price: '$ 989,000',
      beach: '6.1 kilometers',
      developer: 'Damac',
      type: 'Villas',
      area: '180 million sq. ft.',
      lat: 25.114949,
      lng: 55.254992,
      img: '/img/map/dubai-hills.jpg',
    },
  ],
  ru: [
    {
      id: 1,
      title: 'Bluewaters',
      price: '$ 1,789,000',
      beach: '100 метров',
      developer: 'MERAAS',
      type: 'Апартаменты',
      area: '180 million sq. ft.',
      lat: 25.079880,
      lng: 55.121824,
      img: '/img/map/blue-waters.jpg',
    },
    {
      id: 2,
      title: 'Palm Jumeirah',
      price: '$ 976,000',
      beach: '100 метров',
      developer: 'Nakheel',
      type: 'Апартаменты / Виллы',
      area: '180 million sq. ft.',
      lat: 25.115271,
      lng: 55.137262,
      img: '/img/map/palm-jumeirah.jpg',
    },
    {
      id: 3,
      title: 'Dubai Marina & Jumeirah Lake Towers',
      price: '$ 1,239,000',
      beach: '500 метров',
      developer: 'Omniyat',
      type: 'Апартаменты',
      area: '180 million sq. ft.',
      lat: 25.076717,
      lng: 55.139962,
      img: '/img/map/dubai-marina.jpg',
    },
    {
      id: 4,
      title: 'Downtown Dubai & Business Bay',
      price: '$ 1,139,000',
      beach: '2.7 километра',
      developer: 'EMAAR',
      type: 'Апартаменты',
      area: '180 million sq. ft.',
      lat: 25.193920,
      lng: 55.275184,
      img: '/img/map/down-town-dubai.jpg',
    },
    {
      id: 5,
      title: 'Creek Harbour',
      price: '$ 799,000',
      beach: '10 километров',
      developer: 'Sobha',
      type: 'Апартаменты',
      area: '180 million sq. ft.',
      lat: 25.202958,
      lng: 55.350099,
      img: '/img/map/creek-harbour.jpg',
    },
    {
      id: 6,
      title: 'City Walk',
      price: '$ 1,529,000',
      beach: '900 метров',
      developer: 'Ahad',
      type: 'Апартаменты',
      area: '180 million sq. ft.',
      lat: 25.205565,
      lng: 55.263697,
      img: '/img/map/city-walk.jpg',
    },
    {
      id: 7,
      title: 'Jumeirah Village Circle & Triangle',
      price: '$ 689,000',
      beach: '6.5 километров',
      developer: 'Al Habtoor',
      type: 'Апартаменты / Виллы',
      area: '180 million sq. ft.',
      lat: 25.060415,
      lng: 55.208744,
      img: '/img/map/jumeirah-village-circle.jpg',
    },
    {
      id: 8,
      title: 'Dubai Hills',
      price: '$ 989,000',
      beach: '6.1 километров',
      developer: 'Damac',
      type: 'Виллы',
      area: '180 million sq. ft.',
      lat: 25.114949,
      lng: 55.254992,
      img: '/img/map/dubai-hills.jpg',
    },
  ]
};

const mapInfo = document.getElementById('map-info');

const markers = []

const mapInfoTitle = mapInfo.querySelector('.js-map-info-title');
const mapInfoPrice = mapInfo.querySelector('.js-map-info-price');
const mapInfoBeach = mapInfo.querySelector('.js-map-info-beach');
const mapInfoDeveloper = mapInfo.querySelector('.js-map-info-developer');
const mapInfoType = mapInfo.querySelector('.js-map-info-type');

const mapZoomIn = document.querySelector('.js-map-zoom-in');
const mapZoomOut = document.querySelector('.js-map-zoom-out');

const mapElement = document.getElementById('map');

const DUBAI_BOUNDS = {
  north: 25.356709,
  south: 24.940776,
  west: 55.031419,
  east: 55.387416,
};

export async function initMap() {
  const loader = new Loader('AIzaSyCFVN9lovd3dC-PKoK-7VENM-vhhNUcXS8', {});
  const google = await loader.load();

  const styledMapType = new google.maps.StyledMapType(styledData);

  map = new google.maps.Map(mapElement, {
    center,
    zoom: isWindowSizeSmallerThen(800) ? 10.5 : 12,
    disableDefaultUI: true,
    draggable: true,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    restriction: {
      latLngBounds: DUBAI_BOUNDS,
      strictBounds: false,
    },
  });

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  setMarkers(map);

  mapZoomIn.addEventListener('click', function() {
    const currentZoom = map.getZoom()

    if (currentZoom > 14) {
      return
    }

    map.setZoom(currentZoom + 1)
  })

  mapZoomOut.addEventListener('click', function() {
    const currentZoom = map.getZoom()

    if (currentZoom < 10) {
      return
    }

    map.setZoom(currentZoom - 1)
  })

  google.maps.event.addListener(map, 'bounds_changed', hideContentInfo);
}

function setMarkers(map) {
  const image = {
    url: '/img/map-point.svg',
    size: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(25, 25),
  };

  const lang = getPageLang()

  mapPointsData[lang].forEach((data) => {
    const { lat, lng, title } = data;

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      icon: image,
      title,
      cursor: 'pointer',
      opacity: 0.75
    });

    markers.push(marker)

    google.maps.event.addListener(marker, 'click', (e) => showContentInfo(e, data, marker));
  });
}

function showContentInfo(e, data, marker) {
  markers.forEach((marker) => marker.setOpacity(0.75))
  marker.setOpacity(1)

  const { title, price, developer, area, type, img, beach } = data;
  const target = e.domEvent.target;

  const halfSize = target.offsetWidth / 2

  const left = getLeft(target);
  const top = getTop(target) - mapInfo.offsetHeight + halfSize

  let realLeft = (left + mapInfo.offsetWidth - window.innerWidth < -100 ? left : left - mapInfo.offsetWidth) + halfSize

  if (isWindowSizeSmallerThen(480)) {
    realLeft = 0
  }

  mapInfo.style.left = `${realLeft}px`;
  mapInfo.style.top = `${top}px`;

  // console.log(top, mapInfo.offsetHeight);

  if (top < 0) {
    mapInfo.style.top = `${top + mapInfo.offsetHeight}px`;
  }

  mapInfoTitle.innerText = title;
  mapInfoPrice.innerText = price;
  mapInfoDeveloper.innerText = developer;
  mapInfoType.innerText = type;
  mapInfoBeach.innerText = beach;

  const mapInfoImg = mapInfo.querySelector('.js-map-info-img');

  const newImage = document.createElement('img')
  newImage.src = img
  newImage.classList.add('js-map-info-img')

  mapInfoImg.parentNode.replaceChild(newImage, mapInfoImg);

  mapInfo.classList.add('mapItem--active');

  setTimeout(() => {
    document.addEventListener('click', hideContentInfo);
  });

}

function getLeft(element, left = 0) {
  if (element.id === 'map') {
    return left;
  }

  return getLeft(element.parentElement, left + (element.offsetLeft || 0));
}

function getTop(element, top = 0) {
  if (element.id === 'map') {
    return top;
  }

  return getTop(element.parentElement, top + (element.offsetTop || 0));
}

function hideContentInfo(e) {
  if (e?.target &&
    (
      e.target.closest('#map-section img') &&
      !e.target.closest('.js-close-map-info'))
  ) {
    return;
  }

  markers.forEach((marker) => marker.setOpacity(0.75))

  document.removeEventListener('click', hideContentInfo);
  mapInfo.classList.remove('mapItem--active');
}

const styledData = [
  {
    'featureType': 'administrative',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#444444',
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'landscape',
    'elementType': 'all',
    'stylers': [
      {
        'color': '#f2f2f2',
      },
    ],
  },
  {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'road',
    'elementType': 'all',
    'stylers': [
      {
        'saturation': -100,
      },
      {
        'lightness': 45,
      },
    ],
  },
  {
    'featureType': 'road.highway',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'simplified',
      },
    ],
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'transit',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'water',
    'elementType': 'all',
    'stylers': [
      {
        'color': '#ddd5cb',
      },
      {
        'visibility': 'on',
      },
    ],
  },
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      },
      {
        "saturation": "-100"
      }
    ]
  },
];