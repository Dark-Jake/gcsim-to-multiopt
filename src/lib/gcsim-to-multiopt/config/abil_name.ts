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
    "hyperbloom": ["reaction", "hyperbloom"],
    "overload": ["reaction", "overloaded"],

    //TODO passives/skills
    //?---------------------Albedo---------------------//
    "Abiogenesis: Solar Isotoma": ["skill", "dmg"],
    "Abiogenesis: Solar Isotoma (Tick)": ["skill", "blossom"],

    //?---------------------Alhaitam-------------------//
    "Charge 1": ["charged", "dmg"],
    "Universality: An Elaboration on Form": ["skill", "rushDmg"],
    "Chisel-Light Mirror: Projection Attack 1": ["skill", "mirrorDmg1"],
    "Chisel-Light Mirror: Projection Attack 2": ["skill", "mirrorDmg1"],
    "Chisel-Light Mirror: Projection Attack 3": ["skill", "mirrorDmg1"],
    "Particular Field: Fetters of Phenomena": ["burst", "instanceDmg"],
    
    //?---------------------Aloy-----------------------//
    //?---------------------Amber----------------------//

    //?-------------------Arlecchino-------------------//
    "Blood Debt Directive": ["skill", "sigilDmg"],
    "All is Ash (Spike)": ["skill", "spikeDmg"],
    "All is Ash (Cleave)": ["skill", "finalDmg"],
    
    //?---------------------Ayato----------------------//
    //?---------------------Baizhu---------------------//
    //?---------------------Barbara--------------------//
    //?---------------------Beidou---------------------//
    
    //?---------------------Bennett--------------------//
    "Passion Overload (Press)": ["skill", "press"],
    "Fantastic Voyage": ["burst", "dmg"],
    
    //?---------------------Candace--------------------//
    //?---------------------Charlotte------------------//
    //?---------------------Chasca---------------------//
    
    //?--------------------Chevreuse-------------------//
    "Sniper Induced Explosion (C2)": ["constellation2", "dmg"],
    "Surging Blade (Chevreuse)": ["skill", "bladeDmg"],
    "Short-Range Rapid Interdiction Fire [Overcharged]": ["skill", "holdDmg"],
    "Secondary Explosive Shell": ["burst", "shellDmg"],
    "Explosive Grenade": ["burst", "grenadeDmg"],
    
    //?---------------------Chongyun-------------------//
    //?---------------------Clorinde-------------------//
    //?---------------------Collei---------------------//
    //?---------------------Cyno-----------------------//
    //?---------------------Dehya----------------------//
    //?---------------------Diluc----------------------//
    //?---------------------Diona----------------------//
    //?---------------------Dori-----------------------//
    //?---------------------Emilie---------------------//
    //?---------------------Eula-----------------------//
    //?---------------------Faruzan--------------------//

    //?---------------------Fischl---------------------//
    "Fischl A4": ["passive2", "dmg"],
    "Fischl C1": ["constellation1", "dmg"],
    "Her Pilgrimage of Bleak (C4)": ["constellation4", "burstAdditionalDmg"],
    "Fischl C6": ["constellation6", "ozActiveCharDmg"],
    "Midnight Phantasmagoria": ["burst", "dmg"],
    "Oz (Burst)": ["skill", "ozDmg"],

    //?---------------------Freminet-------------------//

    //?---------------------Furina---------------------//
    "Spiritbreath Thorn (Furina)": ["normal", "thornBladeDmg"],
    "Charge Pneuma": ["charged", "dmg"], //! I dont sure this is correct
    "Charge Ousia": ["charged", "dmg"], //! I dont sure this is correct
    "Salon Solitaire: Ousia Bubble": ["skill", "bubbleDmg"],
    "Salon Member: Surintendante Chevalmarin": ["skill", "chevalDmg"],
    "Salon Member: Gentilhomme Usher": ["skill", "usherDmg"],
    "Salon Member: Mademoiselle Crabaletta": ["skill", "crabDmg"],
    "Let the People Rejoice": ["burst", "skillDmg"],

    //?---------------------Gaming---------------------//
    //?---------------------Ganyu----------------------//

    //?---------------------Gorou----------------------//
    "Inuzaka All-Round Defense": ["skill", "dmg"],
    "Juuga: Forward Unto Victory": ["burst", "dmg"],
    "Crystal Collapse": ["burst", "crystalCollapse"],
    
    //?---------------------Heizou---------------------//

    //?---------------------Hu Tao---------------------//
    "Blood Blossom": ["skill", "dmg"],

    //?---------------------Itto-----------------------//
    "Arataki Kesagiri Final Slash": ["charged", "akFinal"],
    "Arataki Kesagiri Combo Slash": ["charged", "akSlash"],
    "Masatsu Zetsugi: Akaushi Burst!": ["skill", "dmg"],
    
    //?---------------------Jean-----------------------//
    //?---------------------Kaeya----------------------//
    //?---------------------Kaveh----------------------//
    //?---------------------Kazuha---------------------//
    //?---------------------Keqing---------------------//
    //?---------------------Kinich---------------------//
    //?---------------------Kirara---------------------//
    //?---------------------Klee-----------------------//
    //?---------------------Kuki-----------------------//
    //?---------------------Layla----------------------//

    //?---------------------Lisa-----------------------//
    "Lightning Rose (Initial)": ["burst", "summon"],
    "Lightning Rose (Tick)": ["burst", "tick"],

    //?---------------------Lynette--------------------//
    //?---------------------Lyney----------------------//
    
    //?---------------------Mavuika--------------------//
    "Flamestrider Charged Attack (Cyclic)": ["skill", "chargedCyclicDmg"],
    "Flamestrider Charged Attack (Final)": ["skill", "chargedFinalDmg"],
    "Flamestrider Sprint": ["skill", "sprintDmg"],
    "Sunfell Slice": ["skill", "skillDmg"],
    "The Named Moment": ["skill", "skillDmg"],
    "Rings of Searing Radiance": ["skill", "radianceDmg"],
    "Flamestrider (C6)": ["constellation6", "flamestriderDmg"],
    "Rings of Searing Radiance (C6)": ["constellation6", "ringDmg"],

    //?---------------------Mika-----------------------//
    //?---------------------Mona-----------------------//

    //?---------------------Mualani--------------------//
    //!"Surfing Hit": ["type", "subtype"],
    "Sharky's Surging Bite": ["skill", "surgingDmg"],
    "Boomsharka-laka": ["burst", "dmg"],

    //?---------------------Nahida---------------------//
    "All Schemes to Know (Press)": ["skill", "pressDmg"],
    "Tri-Karma Purification": ["skill", "karmaDmg"],
    "Tri-Karma Purification: Karmic Oblivion": ["constellation6", "dmg"],

    //?---------------------Navia----------------------//
    //!---------------------Neuvillette----------------//
    //!---------------------Nilou----------------------//
    //?---------------------Ningguang------------------//
    //?---------------------Noelle---------------------//
    //?---------------------Ororon---------------------//
    //?---------------------Qiqi-----------------------//
    //?---------------------Raiden---------------------//
    //?---------------------Razor----------------------//
    //?---------------------Sara-----------------------//
    //?---------------------Sayu-----------------------//
    //?---------------------Sethos---------------------//
    //?---------------------Shenhe---------------------//
    //?---------------------Sigewinne------------------//
    //?---------------------Sucrose--------------------//
    //?---------------------Tartaglia------------------//
    //?---------------------Thoma----------------------//
    //?---------------------Tighnari-------------------//
    //?---------------------Traveler (Anemo)-----------//
    //?---------------------Traveler (Cryo)------------//
    //?---------------------Traveler (Dendro)----------//
    //?---------------------Traveler (Electro)---------//
    //?---------------------Traveler (Geo)-------------//
    //?---------------------Traveler (Hydro)-----------//
    //?---------------------Traveler (Pyro)------------//
    //?---------------------Venti----------------------//
    //?---------------------Wanderer-------------------//
    //?---------------------Wriothesley----------------//
    //?---------------------Xiangling------------------//
    //?---------------------Xiangyun-------------------//
    //?---------------------Xiao-----------------------//
    
    //?---------------------Xilonen--------------------//
    "Yohual's Scratch": ["skill", "rushDmg"],
    "Blade Roller 0": ["normal", "ns0"],
    "Blade Roller 1": ["normal", "ns1"],
    "Ocelotlicue Point!": ["burst", "skillDmg"],
    
    //?---------------------Xingqiu--------------------//
    //?---------------------Xinyan---------------------//
    //?---------------------Yae Miko-------------------//
    //?---------------------Yanfei---------------------//
    //?---------------------Yaoyao---------------------//

    //?---------------------Yelan----------------------//
    "Lingering Lifeline": ["skill", "dmg"],
    "Depth-Clarion Dice": ["burst", "pressDmg"],
    "Exquisite Throw": ["burst", "throwDmg"],

    //?---------------------Yoimiya--------------------//
    //?---------------------Yun Jin--------------------//
    //?---------------------Zhongli--------------------//
    

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