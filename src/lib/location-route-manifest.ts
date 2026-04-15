export const VALID_LOCATION_SLUGS = [
  "south-africa", "gauteng", "north-west", "hartbeespoort", "harties", "schoemansville", "melodie", "ifafi", "meerhof", "kosmos",
  "kosmos-village", "the-islands-estate", "estate-dafrique", "caribbean-beach-club", "key-west-estate", "eagles-landing", "montego-bay", "pecanwood", "pecanwood-estate", "magalies-park",
  "seasons-lifestyle-estate", "cove-ridge", "magalies-golf-estate", "lakeland-estate", "xanadu", "xanadu-nature-estate", "leloko", "leloko-lifestyle-estate", "the-coves", "la-camargue",
  "redstone-estate", "birdwood-estate", "gateway-manor", "landsmeer", "landsmeer-estate", "kosmos-ridge", "mount-kos", "ile-du-lac", "kshane", "broederstroom",
  "skeerpoort", "rietfontein-ah", "melodie-ah", "remhoogte", "welgegund", "village-mall-hartbeespoort", "islands-shopping-mall", "damdoryn", "damdoryn-junction", "mountain-lake-shopping-centre",
  "sediba-plaza", "jasmyn", "jasmyn-farm", "hartbeespoort-dam", "dam-wall", "oberon", "zilkaatsnek", "buffelspoort", "kommando-nek", "safari-gardens",
  "elandsfontein", "hekpoort", "magaliesburg", "brits", "johannesburg", "sandton", "bryanston", "rivonia", "fourways", "morningside",
  "douglasdale", "sunninghill", "paulshof", "lonehill", "woodmead", "diepsloot", "alexandra", "johannesburg-cbd", "braamfontein", "hillbrow",
  "yeoville", "newtown", "rosebank", "parkhurst", "houghton", "melville", "greenside", "auckland-park", "randburg", "northcliff",
  "linden", "blairgowrie", "ferndale", "cresta", "olivedale", "roodepoort", "florida", "constantia-kloof", "weltevredenpark", "zandspruit",
  "north-riding", "honeydew", "rosettenville", "turffontein", "glenvista", "mulbarton", "mondeor", "ormonde", "winchester-hills", "southgate",
  "kibler-park", "soweto", "diepkloof", "orlando", "dobsonville", "pimville", "jabulani", "protea-glen", "orange-farm", "lenasia",
  "ennerdale", "eldorado-park", "midrand", "kyalami", "waterfall", "waterfall-city", "noordwyk", "blue-hills", "halfway-house", "carlswald",
  "vorna-valley", "ivory-park", "rabie-ridge", "pretoria", "pretoria-east", "garsfontein", "moreleta-park", "faerie-glen", "lynnwood", "menlo-park",
  "silver-lakes", "equestria", "menlyn", "constantia-park", "waterkloof", "mamelodi", "pretoria-north", "montana", "annlin", "wonderboom",
  "akasia", "florauna", "theresapark", "soshanguve", "mabopane", "ga-rankuwa", "centurion", "irene", "die-hoewes", "zwartkop",
  "lyttelton", "eldoraigne", "rooihuiskraal", "wierdapark", "pierre-van-ryneveld", "midstream", "olievenhoutbosch", "pretoria-cbd", "arcadia", "hatfield",
  "brooklyn", "sunnyside", "pretoria-west", "danville", "lotus-gardens", "atteridgeville", "roodeplaat", "rayton", "cullinan", "bronkhorstspruit",
  "hammanskraal", "temba", "winterveldt", "ekangala", "kempton-park", "glen-marais", "birchleigh", "rhodesfield", "isando", "jet-park",
  "tembisa", "boksburg", "sunward-park", "benoni", "northmead", "rynfield", "brakpan", "springs", "nigel", "daveyton",
  "kwathema", "tsakane", "duduza", "etwatwa", "germiston", "bedfordview", "edenvale", "greenstone-hill", "modderfontein", "clayville",
  "alberton", "brackenhurst", "katlehong", "vosloorus", "thokoza", "vereeniging", "vanderbijlpark", "meyerton", "heidelberg", "sebokeng",
  "sharpeville", "evaton", "ratanda", "devon", "impumelelo", "henley-on-klip", "walkerville", "de-deur", "krugersdorp", "randfontein",
  "westonaria", "carletonville", "muldersdrift", "lanseria", "kagiso", "munsieville", "mohlakeng", "khutsong", "fochville", "wedela",
  "bekkersdal",
] as const;

const VALID_LOCATION_SLUG_SET = new Set<string>(VALID_LOCATION_SLUGS);

export function isKnownLocationSlug(slug: string): boolean {
  return VALID_LOCATION_SLUG_SET.has(slug);
}
