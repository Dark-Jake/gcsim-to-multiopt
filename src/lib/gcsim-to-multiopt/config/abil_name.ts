export type AbilsType = Record<string, string[]>;

const defaultAbils: AbilsType = {
    "Normal 0": ["normal", "0"],
    "Normal 1": ["normal", "1"],
    "Normal 2": ["normal", "2"],
    "Normal 3": ["normal", "3"],
    "Charge": ["charged", "dmg"],
    "Charge Attack": ["charged", "dmg"],

    //TODO reactions
    "bloom": ["reaction", "bloom"],
    "overload": ["reaction", "overloaded"],

    //TODO passives/skills
    //!-------------------Arlecchino-------------------//
    "Blood Debt Directive": ["skill", "sigilDmg"],
    "All is Ash (Spike)": ["skill", "spikeDmg"],
    "All is Ash (Cleave)": ["skill", "finalDmg"],

    //!---------------------Bennett--------------------//
    "Passion Overload (Press)": ["skill", "press"],
    "Fantastic Voyage": ["burst", "dmg"],

    //!--------------------Chevreuse-------------------//
    "Sniper Induced Explosion (C2)": ["constellation2", "dmg"],
    "Surging Blade (Chevreuse)": ["skill", "bladeDmg"],
    "Short-Range Rapid Interdiction Fire [Overcharged]": ["skill", "holdDmg"],
    "Secondary Explosive Shell": ["burst", "shellDmg"],
    "Explosive Grenade": ["burst", "grenadeDmg"],

    //!---------------------Fischl---------------------//
    "Fischl A4": ["passive2", "dmg"],
    "Fischl C1": ["constellation1", "dmg"],
    "Her Pilgrimage of Bleak (C4)": ["constellation4", "burstAdditionalDmg"],
    "Fischl C6": ["constellation6", "ozActiveCharDmg"],
    "Midnight Phantasmagoria": ["burst", "dmg"],
    "Oz (Burst)": ["skill", "ozDmg"],

    //!---------------------Furina---------------------//
    "Spiritbreath Thorn (Furina)": ["normal", "thornBladeDmg"],
    "Salon Solitaire: Ousia Bubble": ["skill", "bubbleDmg"],
    "Salon Member: Surintendante Chevalmarin": ["skill", "chevalDmg"],
    "Salon Member: Gentilhomme Usher": ["skill", "usherDmg"],
    "Salon Member: Mademoiselle Crabaletta": ["skill", "crabDmg"],
    "Let the People Rejoice": ["burst", "skillDmg"],

    //!---------------------Mavuika--------------------//
    "Flamestrider Charged Attack (Cyclic)": ["skill", "chargedCyclicDmg"],
    "Flamestrider Charged Attack (Final)": ["skill", "chargedFinalDmg"],
    "Sunfell Slice": ["skill", "skillDmg"],
    "The Named Moment": ["skill", "skillDmg"],
    "Rings of Searing Radiance": ["skill", "radianceDmg"],

    //!---------------------Xilonen--------------------//
    "Yohual's Scratch": ["skill", "rushDmg"],
    "Blade Roller 0": ["normal", "ns0"],
    "Blade Roller 1": ["normal", "ns1"],
    "Ocelotlicue Point!": ["burst", "skillDmg"],

    //TODO weapons
    "Viridescent": ["weapon:TheViridescentHunt", "dmg"],

    //TODO artifacts
    "Sea-Dyed Foam": ["artifact:OceanHuedClam", "heal"],
};

const characterAbils: Record<string, AbilsType> = {
    chiori: {
        "Fluttering Hasode (Upward Sweep)": ["skill", "sweepDmg"],
        "Fluttering Hasode (Tamato - Construct)": ["skill", "turretDmg"],
        "Fluttering Hasode (Tamato)": ["skill", "turretDmg"],
        "Hiyoku: Twin Blades": ["burst", "bloomDmg"],
        "Fluttering Hasode (Seize the Moment)": ["passive1", "dollDmg"],
        "Fluttering Hasode (Kinu)": ["constellation2", "dollDmg"],
    },

    kokomi: {
        "Bake-Kurage": ["skill", "dmg"],
        "Nereid's Ascension": ["burst", "dmg"],
        "At Water's Edge (C1)": ["constellation1", "dmg"],
    },

    nilou: {
        "Water Wheel": ["skill", "wheelDmg"],
        "Sword Dance 0": ["skill", "dance1Dmg"],
        "Sword Dance 1": ["skill", "dance2Dmg"],
        "Dance of Haftkarsvar": ["skill", "skillDmg"],
        "Lingering Aeon": ["burst", "aeonDmg"],
        "Dance of Abzendegi: Distant Dreams, Listening Spring": ["burst", "skillDmg"],
    },

    ayaka: {
        "Charge": ["charged", "dmg1"],
        "Hyouka": ["skill", "press"],
        "C2 Mini-Frostflake Seki no To (Bloom)": ["constellation2", "bloom"],
        "Soumetsu (Bloom)": ["burst", "bloom"],
        "C2 Mini-Frostflake Seki no To (Cutting)": ["constellation2", "dmg"],
        "Soumetsu (Cutting)": ["burst", "cutting"],
    },

    neuvillette: {
        "Charged Attack: Equitable Judgment": ["charged", "judgmentDmg"],
        "O Tides, I Have Returned: Waterfall DMG": ["burst", "waterfallDmg"],
        "O Tides, I Have Returned: Skill DMG": ["burst", "skillDmg"],
        "Spiritbreath Thorn (Neuvillette)": ["skill", "thornDmg"],
        "O Tears, I Shall Repay": ["skill", "skillDmg"],
    },

    hutao: {
        "Blood Blossom": ["skill", "dmg"],
        // sim doesn't have different names for <50% hp and >50% hp hu tao bursts
        "Spirit Soother": ["burst", "dmg"],
    }
};

export default function (charName?: string) {
    if (!charName || !characterAbils[charName]) {
        return defaultAbils;
    }
    // some abils have the same name in gcsim, but different paths in go
    // like charged (["charged", "dmg"] for most characters, but ["charged", "dmg1"] for ayaka)
    return { ...defaultAbils, ...characterAbils[charName] };
}