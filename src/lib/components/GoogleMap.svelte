<script lang="ts">
    import { onMount } from 'svelte';
    import mapStyles from '$lib/data/map.style.json';
  
    // Your Google Maps API key
    const apiKey: string = 'AIzaSyD-UD2Gaf9mCPYDffqfgLe9xxHnYz5x1xQ';
  
    let mapContainer: HTMLElement | null = null;
  let directionsService: google.maps.DirectionsService;
  let directionsRenderer: google.maps.DirectionsRenderer;
  let eta: string = '';

  onMount(() => {
    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        initializeMap();
      };
    } else {
      initializeMap();
    }
  });

  function initializeMap(): void {
    if (!mapContainer) return;
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 55.752004, lng: 37.617734 },
      zoom: 13,
      styles: mapStyles as google.maps.MapTypeStyle[],
    };

    const map = new google.maps.Map(mapContainer, mapOptions);
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Example: Calculate route from Sydney to Melbourne
    calculateAndDisplayRoute('DRIVING' as google.maps.TravelMode);
  }

  function calculateAndDisplayRoute(travelMode: google.maps.TravelMode): void {
    if (!directionsService || !directionsRenderer) return;

    const start = { lat: 55.554384, lng: 37.513467 };
    const end = { lat: 55.728312, lng: 37.609500 };

    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: travelMode,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(response);
          const leg = response?.routes[0].legs[0] == undefined ? null : response.routes[0].legs[0];
          eta = `ETA: ${leg?.duration?.text}`;
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  function setTravelMode(mode: string) {
    calculateAndDisplayRoute(mode as google.maps.TravelMode);
  }
</script>

<div>
  <button on:click={() => setTravelMode('DRIVING')}>Car</button>
  <button on:click={() => setTravelMode('WALKING')}>Foot</button>
  <button on:click={() => setTravelMode('BICYCLING')}>Bike</button>
</div>
<p>{eta}</p>
<div bind:this={mapContainer} style="width: 100%; height: 60vh;"></div>