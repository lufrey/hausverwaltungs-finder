import { z } from "zod";
import { typedObjectKeys } from "@/utils/typeHelper";

export const berlinDistricts = {
  charlottenburg: {
    name: "Charlottenburg",
    plz: [
      "10627",
      "14057",
      "10625",
      "10589",
      "10587",
      "10585",
      "10629",
      "14059",
      "10623",
      "10623",
    ],
  },
  maerkischesviertel: {
    name: "Märkisches Viertel",
    plz: ["13439", "13435"],
  },
  rosenthal: {
    name: "Rosenthal",
    plz: ["13158"],
  },
  pankow: {
    name: "Pankow",
    plz: ["13189", "13187"],
  },
  britz: {
    name: "Britz",
    plz: ["12347", "12359"],
  },
  koepenick: {
    name: "Köpenick",
    plz: ["12559", "12559"],
  },
  wannsee: {
    name: "Wannsee",
    plz: ["14109"],
  },
  westend: {
    name: "Westend",
    plz: ["14053", "14052", "14055", "14050"],
  },
  lichterfelde: {
    name: "Lichterfelde",
    plz: ["12209"],
  },
  wedding: {
    name: "Wedding",
    plz: ["13351", "13353", "13347", "13405", "13349", "13355"],
  },
  altglienicke: {
    name: "Altglienicke",
    plz: ["12524"],
  },
  tegel: {
    name: "Tegel",
    plz: ["13503", "13507", "13505"],
  },
  moabit: {
    name: "Moabit",
    plz: ["10559", "10557", "10555", "10551", "10553"],
  },
  mitte: {
    name: "Mitte",
    plz: ["10179", "10115", "10178", "10119", "10117"],
  },
  berlin: {
    name: "Berlin",
    plz: [
      "12487",
      "12305",
      "12277",
      "10319",
      "12309",
      "10827",
      "12679",
      "12307",
      "12687",
      "12685",
      "10825",
      "12305",
      "12619",
      "12629",
      "12685",
      "12679",
      "12557",
      "12681",
      "12279",
      "12689",
    ],
  },
  nikolassee: {
    name: "Nikolassee",
    plz: ["14129"],
  },
  tiergarten: {
    name: "Tiergarten",
    plz: ["10787", "10785"],
  },
  tempelhof: {
    name: "Tempelhof",
    plz: ["12101", "12099", "12103"],
  },
  prenzlauerberg: {
    name: "Prenzlauer Berg",
    plz: ["10437", "10405", "10409", "10435", "10407", "10439"],
  },
  buckow: {
    name: "Buckow",
    plz: ["12351", "12349"],
  },
  friedrichshain: {
    name: "Friedrichshain",
    plz: ["10247", "10243", "10249", "10245"],
  },
  schmoeckwitz: {
    name: "Schmöckwitz",
    plz: ["12527"],
  },
  hakenfelde: {
    name: "Hakenfelde",
    plz: ["13587"],
  },
  lichtenberg: {
    name: "Lichtenberg",
    plz: ["10367", "10369", "10365"],
  },
  steglitz: {
    name: "Steglitz",
    plz: ["12169", "12163", "12167", "12165"],
  },
  friedenau: {
    name: "Friedenau",
    plz: ["12159", "12161"],
  },
  kreuzberg: {
    name: "Kreuzberg",
    plz: [
      "10963",
      "10997",
      "10965",
      "10961",
      "10969",
      "10999",
      "12047",
      "10967",
    ],
  },
  gropiusstadt: {
    name: "Gropiusstadt",
    plz: ["12353"],
  },
  alttreptow: {
    name: "Alt Treptow",
    plz: ["12435"],
  },
  biesdorf: {
    name: "Biesdorf",
    plz: ["12683"],
  },
  reinickendorf: {
    name: "Reinickendorf",
    plz: ["13403", "13509", "13437"],
  },
  wilmersdorf: {
    name: "Wilmersdorf",
    plz: ["10719", "10713", "10707", "10777", "10709", "10717", "14197"],
  },
  lankwitz: {
    name: "Lankwitz",
    plz: ["12249", "12247"],
  },
  schoeneberg: {
    name: "Schöneberg",
    plz: ["10829", "10789", "10781", "10783", "10779", "12157"],
  },
  bohnsdorf: {
    name: "Bohnsdorf",
    plz: ["12526"],
  },
  mariendorf: {
    name: "Mariendorf",
    plz: ["12107", "12109", "12105", "12107"],
  },
  gesundbrunnen: {
    name: "Gesundbrunnen",
    plz: ["13357", "13359"],
  },
  neukoelln: {
    name: "Neukölln",
    plz: [
      "12043",
      "12059",
      "12051",
      "12053",
      "12059",
      "12049",
      "12045",
      "12057",
      "12055",
    ],
  },
  niederschoeneweide: {
    name: "Niederschöneweide",
    plz: ["12439"],
  },
  lichtenfelde: {
    name: "Lichtenfelde",
    plz: ["12203", "12207", "12205"],
  },
  wilhelmsdorf: {
    name: "Wilhelmsdorf",
    plz: ["10715"],
  },
  wartenberg: {
    name: "Wartenberg",
    plz: ["13059"],
  },
  falkenberg: {
    name: "Falkenberg",
    plz: ["13057"],
  },
  niederschoenhausen: {
    name: "Niederschönhausen",
    plz: ["13156"],
  },
  rudow: {
    name: "Rudow",
    plz: ["12355", "12357"],
  },
  mahlsdorf: {
    name: "Mahlsdorf",
    plz: ["12623", "12623"],
  },
  spandau: {
    name: "Spandau",
    plz: ["13585", "13597", "13581", "13583"],
  },
  haselhorst: {
    name: "Haselhorst",
    plz: ["13599"],
  },
  luebars: {
    name: "Lübars",
    plz: ["13469"],
  },
  halensee: {
    name: "Halensee",
    plz: ["10711"],
  },
  west: {
    name: "West",
    plz: ["13409", "13407", "10823"],
  },
  weissensee: {
    name: "Weißensee",
    plz: ["13086", "13088"],
  },
  gatow: {
    name: "Gatow",
    plz: ["14089"],
  },
  franzoesischbuchholz: {
    name: "Französisch Buchholz",
    plz: ["13127"],
  },
  blankenfelde: {
    name: "Blankenfelde",
    plz: ["13159"],
  },
  zehlendorf: {
    name: "Zehlendorf",
    plz: ["14165", "14167", "14163", "14169"],
  },
  oberschoeneweide: {
    name: "Oberschöneweide",
    plz: ["12459"],
  },
  wilhelmstadt: {
    name: "Wilhelmstadt",
    plz: ["13593"],
  },
  falkenhagenerfeld: {
    name: "Falkenhagener Feld",
    plz: ["13589"],
  },
  schmargendorf: {
    name: "Schmargendorf",
    plz: ["14199"],
  },
  althohenschoenhausen: {
    name: "Alt-Hohenschönhausen",
    plz: ["13055", "13053"],
  },
  friedrichsfelde: {
    name: "Friedrichsfelde",
    plz: ["10315"],
  },
  heinelsdorf: {
    name: "Heinelsdorf",
    plz: ["13089"],
  },
  rummelsburg: {
    name: "Rummelsburg",
    plz: ["10317"],
  },
  schoeneichebeiberlin: {
    name: "Schöneiche bei Berlin",
    plz: ["15566"],
  },
  staaken: {
    name: "Staaken",
    plz: ["13591"],
  },
  siemensstadt: {
    name: "Siemensstadt",
    plz: ["13629"],
  },
  karlshorst: {
    name: "Karlshorst",
    plz: ["10318"],
  },
  frohnau: {
    name: "Frohnau",
    plz: ["13465"],
  },
  teltowkanaliii: {
    name: "Teltowkanal III",
    plz: ["12489"],
  },
  hellersdorf: {
    name: "Hellersdorf",
    plz: ["12627"],
  },
  dahlem: {
    name: "Dahlem",
    plz: ["14195"],
  },
  hermsdorf: {
    name: "Hermsdorf",
    plz: ["13467"],
  },
  koepenik: {
    name: "Köpenik",
    plz: ["12555"],
  },
  buch: {
    name: "Buch",
    plz: ["13125"],
  },
  grunewald: {
    name: "Grunewald",
    plz: ["14193"],
  },
  baumschulenweg: {
    name: "Baumschulenweg",
    plz: ["12437"],
  },
  wiesengrund: {
    name: "Wiesengrund",
    plz: ["12587"],
  },
  rahnsdorf: {
    name: "Rahnsdorf",
    plz: ["12589"],
  },
  wlhelmstadt: {
    name: "Wlhelmstadt",
    plz: ["13595"],
  },
  blankenburg: {
    name: "Blankenburg",
    plz: ["13129"],
  },
  kaulsdorf: {
    name: "Kaulsdorf",
    plz: ["12621"],
  },
  charlottenburgnord: {
    name: "Charlottenburg-Nord",
    plz: ["13627"],
  },
  neuschoenhausen: {
    name: "Neu-Schönhausen",
    plz: ["13051"],
  },
} as const;

export const zipCodeToDistrict = Object.entries(berlinDistricts).reduce(
  (acc, [key, district]) => {
    district.plz.forEach((zipCode) => {
      acc[zipCode] = { ...district, slug: key };
    });
    return acc;
  },
  {} as Record<
    string,
    (typeof berlinDistricts)[keyof typeof berlinDistricts] & { slug: string }
  >,
);

// this is necessary for the type to be inferred correctly
const [firstKey, ...restOfKeys] = typedObjectKeys(berlinDistricts);

export const districtIdSchema = z.enum([firstKey, ...restOfKeys]);
export const districtSchema = z.object({
  title: z.string(),
  zipCodes: z.array(z.string()),
});
