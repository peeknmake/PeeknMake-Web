import { MapTypeStyle, MapTypeStyler } from '@agm/core/services/google-maps-types';

export const mpaStyles: MapTypeStyle[] = [
    {
        featureType: "administrative.country",
        stylers: [
            {
                weight: 3.5
            }
        ]
    },
    {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
            {
                visibility: "on"
            },
            {
                weight: 1.5
            }
        ]
    },
    {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [
            {
                saturation: -45
            },
            {
                lightness: -70
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "administrative.neighborhood",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.business",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off"
            }
        ]
    }
];