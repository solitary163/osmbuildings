/**
 * Copyright (C) 2013 OSM Buildings, Jan Marsch
 * A leightweight JavaScript library for visualizing 3D building geometry on interactive maps.
 * @osmbuildings, http://osmbuildings.org
 */
//****** file: prefix.js ******

var OSMBuildings = (function() {

    'use strict';


//****** file: shortcuts.js ******

// object access shortcuts
var Int32Array = Int32Array || Array,
    Uint8Array = Uint8Array || Array,
    m = Math,
    exp = m.exp,
    log = m.log,
    sin = m.sin,
    cos = m.cos,
    tan = m.tan,
    atan = m.atan,
    min = m.min,
    max = m.max,
    doc = document;




//****** file: Color.js ******

var Color = (function() {

    function hsla2rgb(hsla) { // h belongs to [0, 360]; s,l,a belong to [0, 1]
        var r, g, b;

        if (hsla.s === 0) {
            r = g = b = hsla.l; // achromatic
        } else {
            var q = hsla.l < 0.5 ? hsla.l * (1+hsla.s) : hsla.l + hsla.s - hsla.l * hsla.s,
                p = 2 * hsla.l-q;
            hsla.h /= 360;
            r = hue2rgb(p, q, hsla.h + 1/3);
            g = hue2rgb(p, q, hsla.h);
            b = hue2rgb(p, q, hsla.h - 1/3);
        }
        return new Color(
            r * 255 <<0,
            g * 255 <<0,
            b * 255 <<0,
            hsla.a
        );
    }

    function hue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q-p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q-p) * (2/3 - t) * 6;
        }
        return p;
    }

    function Color(r, g, b, a) { // r,g,b belong to [0, 255]; a belongs to [0,1]
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = arguments.length < 4 ? 1 : a;
    }

    var proto = Color.prototype;

    proto.toString = function() {
//        if (this.a === 1) {
//            return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1, 7);
//        }
        return 'rgba(' + [this.r <<0, this.g <<0, this.b <<0, this.a.toFixed(2)].join(',') + ')';
    };

    proto.setLightness = function(l) {
        var hsla = Color.toHSLA(this);
        hsla.l *= l;
        hsla.l = Math.min(1, Math.max(0, hsla.l));
        return hsla2rgb(hsla);
    };

    proto.setAlpha = function(a) {
        return new Color(this.r, this.g, this.b, this.a * a);
    };

    /*
     * str can be in any of the following forms:
     * "#[00-ff][00-ff][00-ff]", "#[00-ff][00-ff][00-ff][00-ff]",
     * "rgb([0-255],[0-255],[0-255])", "rgba([0-255],[0-255],[0-255],[0-1])",
     * "hsl([0-360],[0-1],[0-1])", "hsla([0-360],[0-1],[0-1],[0-1])"
     */
    Color.parse = function(str) {
        var m;
        str += '';
        if (~str.indexOf('#') && (m = str.match(/^#?(\w{2})(\w{2})(\w{2})(\w{2})?$/))) {
            return new Color(
                parseInt(m[1], 16),
                parseInt(m[2], 16),
                parseInt(m[3], 16),
                m[4] ? parseInt(m[4], 16) / 255 : 1
            );
        }

        if ((m = str.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))) {
            return new Color(
                parseInt(m[1], 10),
                parseInt(m[2], 10),
                parseInt(m[3], 10),
                m[4] ? parseFloat(m[5]) : 1
            );
        }

        if ((m = str.match(/hsla?\(([\d.]+)\D+([\d.]+)\D+([\d.]+)(\D+([\d.]+))?\)/))) {
            return hsla2rgb({
                h: parseInt(m[1], 10),
                s: parseFloat(m[2]),
                l: parseFloat(m[3]),
                a: m[4] ? parseFloat(m[5]) : 1
            });
        }
    };

    Color.toHSLA = function(rgba) { // r,g,b belong to [0, 255]; a belongs to [0,1]
        var r = rgba.r/255,
            g = rgba.g/255,
            b = rgba.b/255,
            max = Math.max(r, g, b), min = Math.min(r, g, b),
            h, s, l = (max+min) / 2,
            d;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            d = max-min;
            s = l > 0.5 ? d / (2-max-min) : d / (max+min);
            switch (max) {
                case r: h = (g-b) / d + (g < b ? 6 : 0); break;
                case g: h = (b-r) / d + 2; break;
                case b: h = (r-g) / d + 4; break;
            }
            h /= 6;
        }

        return { h:h*360, s:s, l:l, a:rgba.a };
    };

    return Color;

}());


//****** file: SunPosition.js ******

var getSunPosition = (function() {

    var m = Math,
        sin = m.sin,
        cos = m.cos,
        tan = m.tan,
        asin = m.asin,
        atan2 = m.atan2,
        PI = m.PI,
        RAD = 180/PI;

    var dayMS = 1000 * 60 * 60 * 24,
        J1970 = 2440588,
        J2000 = 2451545,
        M0    = 357.5291 / RAD,
        M1    = 0.98560028 / RAD,
        C1    = 1.9148 / RAD,
        C2    = 0.0200 / RAD,
        C3    = 0.0003 / RAD,
        P     = 102.9372 / RAD,
        e     = 23.45 / RAD,
        th0   = 280.1600 / RAD,
        th1   = 360.9856235 / RAD;

    function dateToJulianDate(date) {     return date.valueOf()/dayMS - 0.5 + J1970; }
    function getSolarMeanAnomaly(Js) {    return M0 + M1 * (Js-J2000); }
    function getEquationOfCenter(M) {     return C1*sin(M) + C2*sin(2*M) + C3*sin(3*M); }
    function getEclipticLongitude(M, C) { return M+P+C+PI; }
    function getSunDeclination(Ls) {      return asin(sin(Ls) * sin(e)); }
    function getRightAscension(Ls) {      return atan2(sin(Ls) * cos(e), cos(Ls)); }
    function getSiderealTime(J, lw) {     return th0 + th1 * (J-J2000) - lw; }
    function getAzimuth(H, phi, d) {      return atan2(sin(H), cos(H)*sin(phi) - tan(d)*cos(phi)); }
    function getAltitude(H, phi, d) {     return asin(sin(phi)*sin(d) + cos(phi)*cos(d) * cos(H)); }

    return function(date, lat, lon) {
        var lw  = -lon/RAD,
            phi =  lat/RAD,
            J   = dateToJulianDate(date),
            M   = getSolarMeanAnomaly(J),
            C   = getEquationOfCenter(M),
            Ls  = getEclipticLongitude(M, C),
            d   = getSunDeclination(Ls),
            a   = getRightAscension(Ls),
            th  = getSiderealTime(J, lw),
            H   = th-a;

        return {
            altitude: getAltitude(H, phi, d),
            azimuth:  getAzimuth(H,  phi, d) - PI/2 // origin: north
        };
    };
})();

//****** file: GeoJSON.js ******

// beware, it's not easy to use this standalone
// dependencies to: makeClockwiseWinding()

var readGeoJSON = function(collection) {
    var i, il, j, jl,
        res = [],
        feature,
        geometry, properties, coordinates,
        wallColor, roofColor,
        last,
        height,
        polygon, footprint, heightSum,
        lat = 1, lon = 0, alt = 2,
        item;

    for (i = 0, il = collection.length; i < il; i++) {
        feature = collection[i];
        if (feature.type !== 'Feature') {
            continue;
        }

        geometry = feature.geometry;
        properties = feature.properties;

        if (geometry.type === 'LineString') {
            last = coordinates.length-1;
            if (coordinates[0][0] === coordinates[last][0] && coordinates[0][1] === coordinates[last][1]) {
                coordinates = geometry.coordinates;
            }
        }

        if (geometry.type === 'Polygon') {
            coordinates = geometry.coordinates;
        }

        // just use the outer ring
        if (geometry.type === 'MultiPolygon') {
            coordinates = geometry.coordinates[0];
        }

        if (!coordinates) {
            continue;
        }

        if (properties.color || properties.wallColor) {
            wallColor = properties.color || properties.wallColor;
        }

        if (properties.roofColor) {
            roofColor = properties.roofColor;
        }

        polygon   = coordinates[0];
        footprint = [];
        height    = properties.height;
        heightSum = 0;
        for (j = 0, jl = polygon.length; j < jl; j++) {
            footprint.push(polygon[j][lat], polygon[j][lon]);
            heightSum += height || polygon[j][alt] || 0;
        }

        // one item per coordinates ring (usually just one ring)
        item = {
            id:properties.id || (footprint[0] + ',' + footprint[1]),
            footprint:makeClockwiseWinding(footprint)
        };

        if (heightSum)            item.height    = heightSum/polygon.length <<0;
        if (properties.minHeight) item.minHeight = properties.minHeight;
        if (wallColor)            item.wallColor = wallColor;
        if (roofColor)            item.roofColor = roofColor;
        res.push(item);
    }

    return res;
};


//****** file: OSMXAPI.js ******

// beware, it's not easy to use this standalone
// dependencies to: makeClockwiseWinding()

var readOSMXAPI = (function() {

    var YARD_TO_METER = 0.9144,
        FOOT_TO_METER = 0.3048,
        INCH_TO_METER = 0.0254,
        METERS_PER_LEVEL = 3;

    function parseDimension(str) {
        var value = parseFloat(str);

        if (~str.indexOf('m')) {
            return value <<0;
        }
        if (~str.indexOf('yd')) {
            return value*YARD_TO_METER <<0;
        }
        if (~str.indexOf('ft')) {
            return value*FOOT_TO_METER <<0;
        }
        if (~str.indexOf('\'')) {
            var parts = str.split('\'');
            var res = parts[0]*FOOT_TO_METER + parts[1]*INCH_TO_METER;
            return res <<0;
        }
        return value <<0;
    }

    var namedColors = {
        black: '#000000',
        white: '#ffffff',
        brown: '#8b4513',
        green: '#00ff7f',
        grey: '#bebebe',
        gray: '#bebebe',
        lightgrey: '#d3d3d3',
        lightgray: '#d3d3d3',
        yellow: '#ffff00',
        red: '#ff0000',
        blue: '#0000ff'
    };

    function parseColor(str) {
        str = str.toLowerCase();

        if (str[0] === '#') {
            return str;
        }

//      living: '#f08060',
//      nonliving: '#cccccc',
//      worship: '#80f080'
        return namedColors[str] || null;
    }

    var baseMaterials = {
        asphalt: 'tar_paper',
        bitumen: 'tar_paper',
        block: 'stone',
        bricks: 'brick',
        glas: 'glass',
        glassfront: 'glass',
        grass: 'plants',
        masonry: 'stone',
        granite: 'stone',
        panels: 'panel',
        paving_stones: 'stone',
        plastered: 'plaster',
        rooftiles: 'roof_tiles',
        roofingfelt: 'tar_paper',
        sandstone: 'stone',
        sheet: 'canvas',
        sheets: 'canvas',
        shingle: 'tar_paper',
        shingles: 'tar_paper',
        slates: 'slate',
        steel: 'metal',
        tar: 'tar_paper',
        tent: 'canvas',
        thatch: 'plants',
        tile: 'roof_tiles',
        tiles: 'roof_tiles'
    };

    // cardboard
    // eternit
    // limestone
    // straw

    var materialColors = {
        brick: '#cc7755',
        bronze: '#ffeecc',
        canvas: '#fff8f0',
        concrete: '#999999',
        copper: '#a0e0d0',
        glass: '#e8f8f8',
        gold: '#ffcc00',
        plants: '#009933',
        metal: '#aaaaaa',
        panel: '#fff8f0',
        plaster: '#999999',
        roof_tiles: '#f08060',
        silver: '#cccccc',
        slate: '#666666',
        stone: '#996666',
        tar_paper: '#333333',
        wood: '#deb887'
    };

    function parseMaterial(str) {
        str = str.toLowerCase();

        if (str[0] === '#') {
            return str;
        }

        return materialColors[baseMaterials[str] || str] || null;
    }

    function isBuilding(data) {
        var tags = data.tags;
        return (tags &&
            !tags.landuse &&
            (tags.building || tags['building:part']) &&
            (!tags.layer || tags.layer >= 0));
    }

    function getBuildingType(tags) {
        if (tags.amenity === 'place_of_worship') {
            return 'worship';
        }

        var type = tags.building;
        if (type === 'yes' || type === 'roof') {
            type = tags['building:use'];
        }
        if (!type) {
            type = tags.amenity;
        }

        switch (type) {
            case 'apartments':
            case 'house':
            case 'residential':
            case 'hut':
                return 'living';
            case 'church':
                return 'worship';
        }

        return 'nonliving';
    }

    function getOuterWay(ways) {
        var w;
        for (var i = 0, il = ways.length; i < il; i++) {
            w = ways[i];
            if (w.type === 'way' && w.role === 'outer') {
                return w;
            }
        }
    }

    function getFootprint(points) {
        if (!points) {
            return;
        }

        var footprint = [], p;
        for (var i = 0, il = points.length; i < il; i++) {
            p = nodes[ points[i] ];
            footprint.push(p[0], p[1]);
        }

        // do not close polygon yet
        if (footprint[footprint.length-2] !== footprint[0] && footprint[footprint.length-1] !== footprint[1]) {
            footprint.push(footprint[0], footprint[1]);
        }

        // can't span a polygon with just 2 points (+ start & end)
        if (footprint.length < 8) {
            return;
        }

        return footprint;
    }

    function mergeTags(dst, src) {
        for (var p in src) {
            if (!dst[p]) {
                dst[p] = src[p];
            }
        }
        return dst;
    }

    function filterTags(tags) {
        var height = 0, minHeight = 0;

        if (tags.height) {
            height = parseDimension(tags.height);
        }
        if (!height && tags['building:height']) {
            height = parseDimension(tags['building:height']);
        }

        if (!height && tags.levels) {
            height = tags.levels*METERS_PER_LEVEL <<0;
        }
        if (!height && tags['building:levels']) {
            height = tags['building:levels']*METERS_PER_LEVEL <<0;
        }

        // min_height
        if (tags.min_height) {
            minHeight = parseDimension(tags.min_height);
        }
        if (!minHeight && tags['building:min_height']) {
            minHeight = parseDimension(tags['building:min_height']);
        }

        if (!minHeight && tags.min_level) {
            minHeight = tags.min_level*METERS_PER_LEVEL <<0;
        }
        if (!minHeight && tags['building:min_level']) {
            minHeight = tags['building:min_level']*METERS_PER_LEVEL <<0;
        }

        var wallColor, roofColor;

        // wall material
        if (tags['building:material']) {
            wallColor = parseMaterial(tags['building:material']);
        }
        if (tags['building:facade:material']) {
            wallColor = parseMaterial(tags['building:facade:material']);
        }
        if (tags['building:cladding']) {
            wallColor = parseMaterial(tags['building:cladding']);
        }
        // wall color
        if (tags['building:color']) {
            wallColor = parseColor(tags['building:color']);
        }
        if (tags['building:colour']) {
            wallColor = parseColor(tags['building:colour']);
        }

        // roof material
        if (tags['roof:material']) {
            roofColor = parseMaterial(tags['roof:material']);
        }
        if (tags['building:roof:material']) {
            roofColor = parseMaterial(tags['building:roof:material']);
        }
        // roof color
        if (tags['roof:color']) {
            roofColor = parseColor(tags['roof:color']);
        }
        if (tags['roof:colour']) {
            roofColor = parseColor(tags['roof:colour']);
        }
        if (tags['building:roof:color']) {
            roofColor = parseColor(tags['building:roof:color']);
        }
        if (tags['building:roof:colour']) {
            roofColor = parseColor(tags['building:roof:colour']);
        }

        return {
            height:    height,
            minHeight: minHeight,
            wallColor: wallColor,
            roofColor: roofColor
        };
    }

    function processNode(node) {
        nodes[node.id] = [node.lat, node.lon];
    }

    function processWay(way) {
        var tags, footprint;
        if (isBuilding(way)) {
            tags = filterTags(way.tags);
            if ((footprint = getFootprint(way.nodes))) {
                addResult(way.id, tags, footprint);
            }
        } else {
            tags = way.tags;
            if (tags && !tags.highway && !tags.railway && !tags.landuse) { // TODO: add more filters
                ways[way.id] = way;
            }
        }
    }

    function processRelation(relation) {
        var outerWay, way,
            tags, footprint;
        if (isBuilding(relation) && (relation.tags.type === 'multipolygon' || relation.tags.type === 'building')) {
            if ((outerWay = getOuterWay(relation.members))) {
                var relTags = filterTags(relation.tags);
                if ((way = ways[outerWay.ref])) {
                    tags = filterTags(way.tags);
                    if ((footprint = getFootprint(way.nodes))) {
                        tags = mergeTags(tags, relTags);
                        addResult(way.id, tags, footprint);
                    }
                }
            }
        }
    }

    function addResult(id, tags, footprint) {
        var item = { id:id, footprint:makeClockwiseWinding(footprint) };
        if (tags.height)    item.height    = tags.height;
        if (tags.minHeight) item.minHeight = tags.minHeight;
        if (tags.wallColor) item.wallColor = tags.wallColor;
        if (tags.roofColor) item.roofColor = tags.roofColor;
        res.push(item);
    }

    var nodes, ways, res;

    return function(data) {
        nodes = {};
        ways = {};
        res = [];

        var item;
        for (var i = 0, il = data.length; i < il; i++) {
            item = data[i];
            switch(item.type ) {
                case 'node':     processNode(item);     break;
                case 'way':      processWay(item);      break;
                case 'relation': processRelation(item); break;
            }
        }

        return res;
    };
})();


//****** file: constants.js ******

// constants, shared to all instances
var VERSION      = '0.1.8a',
    ATTRIBUTION  = '&copy; <a href="http://osmbuildings.org">OSM Buildings</a>',
    OSM_XAPI_URL = 'http://overpass-api.de/api/interpreter?data=[out:json];(way[%22building%22]({s},{w},{n},{e});node(w);way[%22building:part%22=%22yes%22]({s},{w},{n},{e});node(w);relation[%22building%22]({s},{w},{n},{e});way(r);node(w););out;',

    PI         = Math.PI,
    HALF_PI    = PI/2,
    QUARTER_PI = PI/4,
    RAD        = 180/PI,

    MAP_TILE_SIZE  = 256,    // map tile size in pixels
    DATA_TILE_SIZE = 0.0075, // data tile size in geo coordinates, smaller: less data to load but more requests

    MIN_ZOOM = 15,

    LAT = 'latitude', LON = 'longitude',

    DEFAULT_HEIGHT = 15,
    HEIGHT_SCALE = 3;


//****** file: geometry.js ******

function getDistance(p1, p2) {
    var dx = p1[0]-p2[0],
        dy = p1[1]-p2[1];
    return dx*dx + dy*dy;
}

function crop(num) {
    return (num*10000 << 0) / 10000;
}

function getCenter(points) {
    var len, x = 0, y = 0;
    for (var i = 0, il = points.length-3; i < il; i += 2) {
        x += points[i];
        y += points[i+1];
    }
    len = (points.length-2) / 2;
    return [x/len <<0, y/len <<0];
}

function getSquareSegmentDistance(px, py, p1x, p1y, p2x, p2y) {
    var dx = p2x-p1x,
        dy = p2y-p1y,
        t;
    if (dx !== 0 || dy !== 0) {
        t = ((px-p1x) * dx + (py-p1y) * dy) / (dx*dx + dy*dy);
        if (t > 1) {
            p1x = p2x;
            p1y = p2y;
        } else if (t > 0) {
            p1x += dx*t;
            p1y += dy*t;
        }
    }
    dx = px-p1x;
    dy = py-p1y;
    return dx*dx + dy*dy;
}

function simplify(points) {
    var sqTolerance = 2,
        len = points.length/2,
        markers = new Uint8Array(len),

        first = 0,
        last  = len - 1,

        i,
        maxSqDist,
        sqDist,
        index,

        firstStack = [],
        lastStack  = [],

        newPoints  = [];

    markers[first] = markers[last] = 1;

    while (last) {
        maxSqDist = 0;

        for (i = first + 1; i < last; i++) {
            sqDist = getSquareSegmentDistance(
                points[i    *2], points[i    *2 + 1],
                points[first*2], points[first*2 + 1],
                points[last *2], points[last *2 + 1]
            );
            if (sqDist > maxSqDist) {
                index = i;
                maxSqDist = sqDist;
            }
        }

        if (maxSqDist > sqTolerance) {
            markers[index] = 1;

            firstStack.push(first);
            lastStack.push(index);

            firstStack.push(index);
            lastStack.push(last);
        }

        first = firstStack.pop();
        last = lastStack.pop();
    }

    for (i = 0; i < len; i++) {
        if (markers[i]) {
            newPoints.push(points[i*2], points[i*2 + 1]);
        }
    }

    return newPoints;
}

// detect polygon winding direction: clockwise or counter clockwise
function getPolygonWinding(points) {
    var x1, y1, x2, y2,
        a = 0,
        i, il;
    for (i = 0, il = points.length-3; i < il; i += 2) {
        x1 = points[i];
        y1 = points[i+1];
        x2 = points[i+2];
        y2 = points[i+3];
        a += x1*y2 - x2*y1;
    }
    return (a/2) > 0 ? 'CW' : 'CCW';
}

// make polygon winding clockwise. This is needed for proper backface culling on client side.
function makeClockwiseWinding(points) {
    var winding = getPolygonWinding(points);
    if (winding === 'CW') {
        return points;
    }
    var revPoints = [];
    for (var i = points.length-2; i >= 0; i -= 2) {
        revPoints.push(points[i], points[i+1]);
    }
    return revPoints;
}



//****** file: class.js ******

    var osmb = function(url) {


//****** file: variables.js ******

// private variables, specific to an instance
var width = 0, height = 0,
    halfWidth = 0, halfHeight = 0,
    originX = 0, originY = 0,
    zoom, size,

    activeRequest,

    context,

    wallColor = new Color(200, 190, 180),
    altColor  = wallColor.setLightness(0.8),
    roofColor = wallColor.setLightness(1.2),

    wallColorAlpha = wallColor + '',
    altColorAlpha  = altColor + '',
    roofColorAlpha = roofColor + '',

    fadeFactor = 1,
    animTimer,
    zoomAlpha = 1,

    minZoom = MIN_ZOOM,
    maxZoom = 20,
    maxHeight,

    camX, camY, camZ,

    isZooming;


//****** file: functions.js ******

function pixelToGeo(x, y) {
    var res = {};
    x /= size;
    y /= size;
    res[LAT] = y <= 0  ? 90 : y >= 1 ? -90 : RAD * (2 * atan(exp(PI * (1 - 2 * y))) - HALF_PI),
    res[LON] = (x === 1 ?  1 : (x % 1 + 1) % 1) * 360 - 180;
    return res;
}

function geoToPixel(lat, lon) {
    var latitude  = min(1, max(0, 0.5 - (log(tan(QUARTER_PI + HALF_PI * lat / 180)) / PI) / 2)),
        longitude = lon / 360 + 0.5;
    return {
        x: longitude*size <<0,
        y: latitude *size <<0
    };
}

function template(str, data) {
    return str.replace(/\{ *([\w_]+) *\}/g, function(tag, key) {
        return data[key] || tag;
    });
}

function fromRange(sVal, sMin, sMax, dMin, dMax) {
    sVal = min(max(sVal, sMin), sMax);
    var rel = (sVal-sMin) / (sMax-sMin),
        range = dMax-dMin;
    return min(max(dMin + rel*range, dMin), dMax);
}

function xhr(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState !== 4) {
            return;
        }
        if (!req.status || req.status < 200 || req.status > 299) {
            return;
        }
        if (callback && req.responseText) {
            callback(JSON.parse(req.responseText));
        }
    };
    req.open('GET', url);
    req.send(null);
    return req;
}


//****** file: Cache.js ******

var Cache = (function() {

    var _time = new Date();
    var _data = {};

    var me = {};

    me.add = function(key, data) {
        _data[key] = { data:data, time:Date.now() };
    };

    me.get = function(key) {
        return _data[key] && _data[key].data;
    };

    me.purge = function() {
        _time.setMinutes(_time.getMinutes()-5);
        for (var key in _data) {
            if (_data[key].time < _time) {
                delete _data[key];
            }
        }
    };

    return me;

}());


//****** file: Data.js ******

// http://overpass-api.de/api/interpreter?data=[out:json];(way[%22building%22](52.405,13.35,52.410,13.4);node(w);way[%22building:part%22=%22yes%22](52.405,13.35,52.410,13.4);node(w);relation[%22building%22](52.405,13.35,52.410,13.4);way(r);node(w););out;
// http://overpass.osm.rambler.ru/cgi/xapi?

/*
// http://graphviz-dev.appspot.com/
digraph g{
    CityGML -> XML
    KML -> XML
    OSM -> XML [style=dotted]
    XML -> SQL
    Shape -> SQL
    SQL -> GeoJSON
    CartoDB -> GeoJSON
    GeoJSON -> Client
    OSM -> XAPI
    XAPI -> JSON
    XAPI -> XML [style=dotted]
    CartoDB -> JSON [style=dotted]
    JSON -> Client

    CartoDB [shape=box]
    SQL [shape=box]
    XAPI [shape=box]

    Client [shape=box,fillcolor="green",style="filled,rounded"]
}
*/

var Data = (function() {

    var _url;
    var _index = {}; // maintain a list of cached items in order to fade in new ones

    function _closureParse(cacheKey) {
        return function(res) {
            _parse(res, cacheKey);
        };
    }

    function _parse(data, cacheKey) {
        if (!data) {
            return;
        }

        var items;
        if (data.type === 'FeatureCollection') { // GeoJSON
            items = readGeoJSON(data.features);
        } else if (data.osm3s) { // XAPI
            items = readOSMXAPI(data.elements);
        }

        if (cacheKey) {
            Cache.add(cacheKey, items);
        }

        _add(items, true);
    }

    function _add(data, isNew) {
        var items = _scale(data, zoom, isNew);

        var item;
        for (var i = 0, il = items.length; i < il; i++) {
            item = items[i];
            if (!_index[item.id]) {
                item.scale = isNew ? 0 : 1;
                me.renderItems.push(items[i]);
                _index[item.id] = 1;
            }
        }
        fadeIn();
    }

    function _scale(items, zoom) {
        var i, il, j, jl,
            res = [],
            item,
            polygon, px,
            height, minHeight, footprint,
            color, wallColor, altColor, roofColor,
            zoomDelta = maxZoom-zoom;

        for (i = 0, il = items.length; i < il; i++) {
            wallColor = null;
            altColor  = null;
            roofColor = null;

            item = items[i];

            height = (item.height || DEFAULT_HEIGHT)*HEIGHT_SCALE >> zoomDelta;
            if (!height) {
                continue;
            }

            minHeight = item.minHeight*HEIGHT_SCALE >> zoomDelta;
            if (minHeight > maxHeight) {
                continue;
            }

            polygon = item.footprint;
            footprint = new Int32Array(polygon.length);
            for (j = 0, jl = polygon.length-1; j < jl; j+=2) {
                px = geoToPixel(polygon[j], polygon[j+1]);
                footprint[j]   = px.x;
                footprint[j+1] = px.y;
            }

            footprint = simplify(footprint);
            if (footprint.length < 8) { // 3 points + end=start (x2)
                continue;
            }

            if (item.wallColor) {
                if ((color = Color.parse(item.wallColor))) {
                    wallColor = color.setAlpha(zoomAlpha);
                    altColor  = '' + wallColor.setLightness(0.8);
                    wallColor = '' + wallColor;
                }
            }

            if (item.roofColor) {
                if ((color = Color.parse(item.roofColor))) {
                    roofColor = '' + color.setAlpha(zoomAlpha);
                }
            }

            res.push({
                id:        item.id,
                footprint: footprint,
                height:    min(height, maxHeight),
                minHeight: minHeight,
                wallColor: wallColor,
                altColor:  altColor,
                roofColor: roofColor,
                center:    getCenter(footprint)
            });
        }

        return res;
    }

    var me = {};

    me.renderItems = []; // TODO: move to renderer

    me.load = function(url) {
        _url = url;
        me.update();
    };

    me.update = function() {
        if (!_url || zoom < MIN_ZOOM) {
            return;
        }

        var nw = pixelToGeo(originX,       originY),
            se = pixelToGeo(originX+width, originY+height),
            sizeLat = DATA_TILE_SIZE,
            sizeLon = DATA_TILE_SIZE*2;

        var bounds = {
            n: (nw.latitude /sizeLat <<0) * sizeLat + sizeLat,
            e: (se.longitude/sizeLon <<0) * sizeLon + sizeLon,
            s: (se.latitude /sizeLat <<0) * sizeLat,
            w: (nw.longitude/sizeLon <<0) * sizeLon
        };

        Cache.purge();
        me.renderItems = [];
        _index = {};

        var lat, lon,
            cached, key;



        for (lat = bounds.s; lat <= bounds.n; lat += sizeLat) {
            for (lon = bounds.w; lon <= bounds.e; lon += sizeLon) {
                key = lat + ',' + lon;
                if ((cached = Cache.get(key))) {
                    _add(cached);
                } else {
                    xhr(template(_url, {
                        n: crop(lat+sizeLat),
                        e: crop(lon+sizeLon),
                        s: crop(lat),
                        w: crop(lon)
                    }), _closureParse(key));
                }
            }
        }
    };

    me.set = function(data) {
        me.renderItems = [];
        _index = {};
        _parse(data);
    };

    return me;

}());


//****** file: render.js ******


function fadeIn() {
    if (animTimer) {
        return;
    }

    animTimer = setInterval(function() {
        var item, needed = false;
        for (var i = 0, il = Data.renderItems.length; i < il; i++) {
            item = Data.renderItems[i];
            if (item.scale < 1) {
                item.scale += 0.5*0.2; // amount*easing
                if (item.scale > 1) {
                    item.scale = 1;
                }
                needed = true;
            }
        }

        renderAll();

        if (!needed) {
            clearInterval(animTimer);
            animTimer = null;
        }
    }, 33);
}

function renderAll() {
    Shadows.render();
    FlatBuildings.render();
    render();
}

function render() {
    context.clearRect(0, 0, width, height);

    // show on high zoom levels only and avoid rendering during zoom
    if (zoom < minZoom || isZooming) {
        return;
    }

    var i, il, j, jl,
        item,
        f, h, m, n,
        x, y,
        flatMaxHeight = FlatBuildings.MAX_HEIGHT,
        sortCam = [camX+originX, camY+originY],
        footprint, roof,
        isVisible,
        ax, ay, bx, by,
        a, b, _a, _b;

    // TODO: FlatBuildings are drawn separetely, data has to be split
    Data.renderItems.sort(function(a, b) {
        return getDistance(b.center, sortCam)/b.height - getDistance(a.center, sortCam)/a.height;
    });

    for (i = 0, il = Data.renderItems.length; i < il; i++) {
        item = Data.renderItems[i];

        if (item.height <= flatMaxHeight) {
            continue;
        }

        isVisible = false;
        f = item.footprint;
        footprint = []; // typed array would be created each pass and is way too slow
        for (j = 0, jl = f.length - 1; j < jl; j += 2) {
            footprint[j]   = x = f[j]  -originX;
            footprint[j+1] = y = f[j+1]-originY;

            // checking footprint is sufficient for visibility
            // TODO probably pre-filter by data tile position
            if (!isVisible) {
                isVisible = (x > 0 && x < width && y > 0 && y < height);
            }
        }

        if (!isVisible) {
            continue;
        }

        // when fading in, use a dynamic height
        h = item.scale < 1 ? item.height*item.scale : item.height;
        // precalculating projection height factor
        m = camZ / (camZ-h);

        // prepare same calculations for min_height if applicable
        if (item.minHeight) {
            h = item.scale < 1 ? item.minHeight*item.scale : item.minHeight;
            n = camZ / (camZ-h);
        }

        roof = []; // typed array would be created each pass and is way too slow

        for (j = 0, jl = footprint.length-3; j < jl; j += 2) {
            ax = footprint[j];
            ay = footprint[j+1];
            bx = footprint[j+2];
            by = footprint[j+3];

            // project 3d to 2d on extruded footprint
            _a = project(ax, ay, m);
            _b = project(bx, by, m);

            if (item.minHeight) {
                a = project(ax, ay, n);
                b = project(bx, by, n);
                ax = a.x;
                ay = a.y;
                bx = b.x;
                by = b.y;
            }

            // backface culling check
            if ((bx-ax) * (_a.y-ay) > (_a.x-ax) * (by-ay)) {
                // depending on direction, set wall shading
                if ((ax < bx && ay < by) || (ax > bx && ay > by)) {
                    context.fillStyle = item.altColor  || altColorAlpha;
                } else {
                    context.fillStyle = item.wallColor || wallColorAlpha;
                }

                drawShape([
                    bx, by,
                    ax, ay,
                    _a.x, _a.y,
                    _b.x, _b.y
                ]);
            }
            roof[j]   = _a.x;
            roof[j+1] = _a.y;
        }

        // fill roof and optionally stroke it
        context.fillStyle   = item.roofColor || roofColorAlpha;
        context.strokeStyle = item.altColor  || altColorAlpha;
        drawShape(roof, true);
    }
}

function drawShape(points, stroke) {
    if (!points.length) {
        return;
    }

    context.beginPath();
    context.moveTo(points[0], points[1]);
    for (var i = 2, il = points.length; i < il; i += 2) {
        context.lineTo(points[i], points[i+1]);
    }
    context.closePath();
    if (stroke) {
        context.stroke();
    }
    context.fill();
}

function project(x, y, m) {
    return {
        x: (x-camX) * m + camX <<0,
        y: (y-camY) * m + camY <<0
    };
}

/*
function debugMarker(x, y, color, size) {
    context.fillStyle = color || '#ffcc00';
    context.beginPath();
    context.arc(x, y, size || 3, 0, PI*2, true);
    context.closePath();
    context.fill();
}

function debugLine(ax, ay, bx, by, color) {
    context.strokeStyle = color || '#ff0000';
    context.beginPath();
    context.moveTo(ax, ay);
    context.lineTo(bx, by);
    context.closePath();
    context.stroke();
}
*/


//****** file: Shadows.js ******

var Shadows = (function() {

    var _context;
    var _enabled = true;
    var _color = new Color(0, 0, 0);
    var _date = null;
    var _direction = { x:0, y:0 };

    function _project(x, y, h) {
        return {
            x: x + _direction.x*h,
            y: y + _direction.y*h
        };
    }

    var me = {};

    me.setContext = function(context) {
        _context = context;
        // TODO: fix bad Date() syntax
        me.setDate(new Date().setHours(10)); // => render()
    };

    me.enable = function(flag) {
        _enabled = !!flag;
        // should call me.render() but it is usually set by setStyle() and there a renderAll() is called
    };

    me.render = function() {
        var center, sun, length, alpha, colorStr;

        _context.clearRect(0, 0, width, height);

        // show on high zoom levels only and avoid rendering during zoom
        if (!_enabled || zoom < minZoom || isZooming) {
            return;
        }

        // TODO: at some point, calculate me just on demand
        center = pixelToGeo(originX+halfWidth, originY+halfHeight);
        sun = getSunPosition(_date, center.latitude, center.longitude);

        if (sun.altitude <= 0) {
            return;
        }

        length = 1 / tan(sun.altitude);
        alpha = 0.4 / length;
        _direction.x = cos(sun.azimuth) * length;
        _direction.y = sin(sun.azimuth) * length;

        // TODO: maybe introduce Color.setAlpha()
        _color.a = alpha;
        colorStr = _color + '';

        var i, il, j, jl,
            item,
            f, h, g,
            x, y,
            footprint,
            mode,
            isVisible,
            ax, ay, bx, by,
            a, b, _a, _b,
            points,
            allFootprints = [];

        _context.beginPath();

        for (i = 0, il = Data.renderItems.length; i < il; i++) {
            item = Data.renderItems[i];

// TODO: no shadows when buildings are too flat => don't add them to renderItems then
//        if (item.height <= FlatBuildings.MAX_HEIGHT) {
//            continue;
//        }

            isVisible = false;
            f = item.footprint;
            footprint = [];
            for (j = 0, jl = f.length - 1; j < jl; j += 2) {
                footprint[j]   = x = f[j]  -originX;
                footprint[j+1] = y = f[j+1]-originY;

                // TODO: checking footprint is sufficient for visibility - NOT VALID FOR SHADOWS!
                if (!isVisible) {
                    isVisible = (x > 0 && x < width && y > 0 && y < height);
                }
            }

            if (!isVisible) {
                continue;
            }

            // when fading in, use a dynamic height
            h = item.scale < 1 ? item.height*item.scale : item.height;

            // prepare same calculations for min_height if applicable
            if (item.minHeight) {
                g = item.scale < 1 ? item.minHeight*item.scale : item.minHeight;
            }

            mode = null;

            for (j = 0, jl = footprint.length-3; j < jl; j += 2) {
                ax = footprint[j];
                ay = footprint[j+1];
                bx = footprint[j+2];
                by = footprint[j+3];

                _a = _project(ax, ay, h);
                _b = _project(bx, by, h);

                if (item.minHeight) {
                    a = _project(ax, ay, g);
                    b = _project(bx, by, g);
                    ax = a.x;
                    ay = a.y;
                    bx = b.x;
                    by = b.y;
                }

                if ((bx-ax) * (_a.y-ay) > (_a.x-ax) * (by-ay)) {
                    if (mode === 1) {
                        _context.lineTo(ax, ay);
                    }
                    mode = 0;
                    if (!j) {
                        _context.moveTo(ax, ay);
                    }
                    _context.lineTo(bx, by);
                } else {
                    if (mode === 0) {
                        _context.lineTo(_a.x, _a.y);
                    }
                    mode = 1;
                    if (!j) {
                        _context.moveTo(_a.x, _a.y);
                    }
                    _context.lineTo(_b.x, _b.y);
                }
            }

            _context.closePath();

            allFootprints.push(footprint);
        }

        _context.fillStyle = colorStr;
        _context.fill();

        // now draw all the footprints as negative clipping mask
        _context.globalCompositeOperation = 'destination-out';
        _context.beginPath();
        for (i = 0, il = allFootprints.length; i < il; i++) {
            points = allFootprints[i];
            _context.moveTo(points[0], points[1]);
            for (j = 2, jl = points.length; j < jl; j += 2) {
                _context.lineTo(points[j], points[j+1]);
            }
            _context.lineTo(points[0], points[1]);
            _context.closePath();
        }
        _context.fillStyle = '#00ff00';
        _context.fill();
        _context.globalCompositeOperation = 'source-over';
    };

    me.setDate = function(date) {
        _date = date;
        me.render();
    };

    return me;

}());


//****** file: FlatBuildings.js ******

var FlatBuildings = (function() {

    var _context;

    var me = {};

    me.MAX_HEIGHT = 8;

    me.setContext = function(context) {
        _context = context;
    };

    me.render = function() {
        _context.clearRect(0, 0, width, height);

        // show on high zoom levels only and avoid rendering during zoom
        if (zoom < minZoom || isZooming) {
            return;
        }

        var i, il, j, jl,
            item,
            f,
            x, y,
            footprint,
            isVisible,
            ax, ay;

        _context.beginPath();

        for (i = 0, il = Data.renderItems.length; i < il; i++) {
            item = Data.renderItems[i];

            if (item.height > me.MAX_HEIGHT) {
                continue;
            }

            isVisible = false;
            f = item.footprint;
            footprint = [];
            for (j = 0, jl = f.length-1; j < jl; j += 2) {
                footprint[j]   = x = f[j]  -originX;
                footprint[j+1] = y = f[j+1]-originY;

                // checking footprint is sufficient for visibility
                if (!isVisible) {
                    isVisible = (x > 0 && x < width && y > 0 && y < height);
                }
            }

            if (!isVisible) {
                continue;
            }

            for (j = 0, jl = footprint.length-3; j < jl; j += 2) {
                ax = footprint[j];
                ay = footprint[j + 1];
                if (!j) {
                    _context.moveTo(ax, ay);
                } else {
                    _context.lineTo(ax, ay);
                }
            }

            _context.closePath();
        }

        _context.fillStyle   = roofColorAlpha;
        _context.strokeStyle = altColorAlpha;

        _context.stroke();
        _context.fill();
    };

    return me;

}());


//****** file: Layers.js ******

var Layers = (function() {

    var _container = doc.createElement('DIV');
    _container.style.pointerEvents = 'none';
    _container.style.position = 'absolute';
    _container.style.left = 0;
    _container.style.top  = 0;

    var _items = [];

    // TODO: improve this to _createItem(Layer) => layer.setContext(context)
    Shadows.setContext(      _createItem());
    FlatBuildings.setContext(_createItem());
    context = _createItem(); // default (global) render context

    function _createItem() {
        var canvas = doc.createElement('CANVAS');
        canvas.style.webkitTransform = 'translate3d(0,0,0)'; // turn on hw acceleration
        canvas.style.imageRendering = 'optimizeSpeed';
        canvas.style.position = 'absolute';
        canvas.style.left = 0;
        canvas.style.top  = 0;

        var context = canvas.getContext('2d');
        context.lineCap   = 'round';
        context.lineJoin  = 'round';
        context.lineWidth = 1;

        context.mozImageSmoothingEnabled    = false;
        context.webkitImageSmoothingEnabled = false;

        _items.push(canvas);
        _container.appendChild(canvas);

        return context;
    }

    var me = {};

    me.appendTo = function(parentNode) {
        parentNode.appendChild(_container);
        return _container;
    };

    me.setSize = function(w, h) {
        for (var i = 0, il = _items.length; i < il; i++) {
            _items[i].width  = w;
            _items[i].height = h;
        }
    };

    return me;

}());


//****** file: properties.js ******

function setSize(w, h) {
    width  = w;
    height = h;
    halfWidth  = width /2 <<0;
    halfHeight = height/2 <<0;
    camX = halfWidth;
    camY = height;
    camZ = width / (1.5 / (window.devicePixelRatio || 1)) / tan(90/2) <<0; // adapting cam pos to field of view (90°), 1.5 is an empirical correction factor
    Layers.setSize(width, height);
    // TODO: change of maxHeight needs to adjust building heights!
    maxHeight = camZ-50;
}

function setOrigin(x, y) {
    originX = x;
    originY = y;
}

function setZoom(z) {
    zoom = z;
    size = MAP_TILE_SIZE <<zoom;

    zoomAlpha = 1 - fromRange(zoom, minZoom, maxZoom, 0, 0.3);

    wallColorAlpha = wallColor.setAlpha(zoomAlpha) + '';
    altColorAlpha  = altColor.setAlpha( zoomAlpha) + '';
    roofColorAlpha = roofColor.setAlpha(zoomAlpha) + '';
}

function setCam(x, y) {
    camX = x;
    camY = y;
}

function setStyle(style) {
    style = style || {};
    if (style.color || style.wallColor) {
        wallColor = Color.parse(style.color || style.wallColor);
        wallColorAlpha = wallColor.setAlpha(zoomAlpha) + '';

        altColor = wallColor.setLightness(0.8);
        altColorAlpha = altColor.setAlpha(zoomAlpha) + '';

        roofColor = wallColor.setLightness(1.2);
        roofColorAlpha = roofColor.setAlpha(zoomAlpha) + '';
    }

    if (style.roofColor) {
        roofColor = Color.parse(style.roofColor);
        roofColorAlpha = roofColor.setAlpha(zoomAlpha) + '';
    }

    if (style.shadows !== undefined) {
        Shadows.enable(style.shadows);
    }

    renderAll();
}


//****** file: events.js ******

function onResize(e) {
    setSize(e.width, e.height);
    renderAll();
    Data.update();
}

function onMoveEnd(e) {
    renderAll();
    Data.update(); // => fadeIn() => renderAll()
}

function onZoomStart(e) {
    isZooming = true;
    // effectively clears because of isZooming flag
    renderAll();
}

function onZoomEnd(e) {
    isZooming = false;
    setZoom(e.zoom);
    Data.update(); // => fadeIn()
    renderAll();
}

var self = this;
function onDeviceMotion(e) {
	self.setCamOffset(e.x, e.y);
    render();
}

if (window.DeviceMotionEvent) {
	var minMovement = 2, abs = Math.abs;
	window.addEventListener('devicemotion', function(e) {
		var t;
		if ((e = e.accelerationIncludingGravity || e.acceleration)) {
			if (abs(e.x) > minMovement || abs(e.y) > minMovement || abs(e.z) > minMovement) {
				switch (window.orientation) {
					case  -90: t = e.x; e.x =  e.y; e.y = -t; break;
					case   90: t = e.x; e.x = -e.y; e.y =  t; break;
					case  180:
					case -180: e.x *= -1; e.y *= -1; break;
				}
				onDeviceMotion({ x:-e.x*10, y:-e.y*10 });
			}
		}
    });
}

window.addEventListener('mousemove', function(e) {
	var minMovement = 2, abs = Math.abs;
    var x = width/2-e.x, y = height-e.y;
    if (abs(x) > minMovement || abs(y) > minMovement) {
        onDeviceMotion({ x:-x/3, y:-y/3 });
    }
});


//****** file: public.js ******

this.setStyle = function(style) {
    setStyle(style);
    return this;
};

this.setCamOffset = function(x, y) {
    camX = halfWidth + x;
    camY = height    + y;
};

this.setMaxZoom = function(z) {
    maxZoom = z;
};

this.setDate = function(date) {
    Shadows.setDate(date);
    return this;
};

this.appendTo = function(parentNode) {
    return Layers.appendTo(parentNode);
};

/**
 * @param {string} url string
 */
this.loadData = function(url) {
    Data.load(url);
    return this;
};

/**
 * @param {object} data object
 */
this.setData = function(data) {
    Data.set(data);
    return this;
};

this.onMoveEnd   = onMoveEnd;
this.onZoomEnd   = onZoomEnd;
this.onZoomStart = onZoomStart;
this.setOrigin   = setOrigin;
this.setSize     = setSize;
this.setZoom     = setZoom;
this.render      = render;


//****** file: suffix.js ******

    };

    osmb.VERSION      = VERSION;
    osmb.ATTRIBUTION  = ATTRIBUTION;
    osmb.OSM_XAPI_URL = OSM_XAPI_URL;

    return osmb;

}());


//****** file: OpenLayers.js ******

/**
 * basing on a pull request from Jérémy Judéaux (https://github.com/Volune)
 */

OpenLayers.Layer.Buildings = OpenLayers.Class(OpenLayers.Layer, {

    CLASS_NAME: 'OpenLayers.Layer.Buildings',

    name: 'OSM Buildings',
    attribution: OSMBuildings.ATTRIBUTION,

    isBaseLayer: false,
    alwaysInRange: true,

    dxSum: 0, // for cumulative cam offset during moveBy
    dySum: 0, // for cumulative cam offset during moveBy

    initialize: function(options) {
        options = options || {};
        options.projection = 'EPSG:900913';
        OpenLayers.Layer.prototype.initialize.call(this, this.name, options);
    },

    setOrigin: function() {
        var origin = this.map.getLonLatFromPixel(new OpenLayers.Pixel(0, 0)),
            res = this.map.resolution,
            ext = this.maxExtent,
            x = Math.round((origin.lon - ext.left) / res),
            y = Math.round((ext.top - origin.lat) / res)
        ;
        this.osmb.setOrigin(x, y);
    },

    setMap: function(map) {
        if (!this.map) {
            OpenLayers.Layer.prototype.setMap.call(this, map);
        }
        if (!this.osmb) {
            this.osmb = new OSMBuildings();
            this.container = this.osmb.appendTo(this.div);
        }
        this.osmb.setSize(this.map.size.w, this.map.size.h);
        this.osmb.setZoom(this.map.zoom);
        this.setOrigin();
    },

    removeMap: function(map) {
        this.container.parentNode.removeChild(this.container);
        OpenLayers.Layer.prototype.removeMap.call(this, map);
    },

    onMapResize: function() {
        OpenLayers.Layer.prototype.onMapResize.call(this);
        this.osmb.onResize({ width: this.map.size.w, height: this.map.size.h });
    },

    moveTo: function(bounds, zoomChanged, dragging) {
        var result = OpenLayers.Layer.prototype.moveTo.call(this, bounds, zoomChanged, dragging);
        if (!dragging) {
            var
                offsetLeft = parseInt(this.map.layerContainerDiv.style.left, 10),
                offsetTop  = parseInt(this.map.layerContainerDiv.style.top, 10)
            ;
            this.div.style.left = -offsetLeft + 'px';
            this.div.style.top  = -offsetTop  + 'px';
        }

        this.setOrigin();
        this.dxSum = 0;
        this.dySum = 0;
        this.osmb.setCamOffset(this.dxSum, this.dySum);

        if (zoomChanged) {
            this.osmb.onZoomEnd({ zoom: this.map.zoom });
        } else {
            this.osmb.onMoveEnd();
        }

        return result;
    },

    moveByPx: function(dx, dy) {
        this.dxSum += dx;
        this.dySum += dy;
        var result = OpenLayers.Layer.prototype.moveByPx.call(this, dx, dy);
        this.osmb.setCamOffset(this.dxSum, this.dySum);
        this.osmb.render();
        return result;
    },

    // TODO: refactor these ugly bindings

    setStyle: function(style)  {
        this.osmb.setStyle(style);
        return this;
    },

    setDate: function(date)  {
        this.osmb.setDate(date);
        return this;
    },

    load: function(url) {
        this.osmb.loadData(url);
        return this;
    },

    geoJSON: function(data) {
        this.osmb.setData(data);
        return this;
    }
});


