export type AbilsType = Record<string, string[]>;

const defaultAbils: AbilsType = {
    "Normal 0": ["normal", "0"],
    "Normal 1": ["normal", "1"],
    "Normal 2": ["normal", "2"],
    "Normal 3": ["normal", "3"],
    "Normal 4": ["normal", "4"],
    "Charge": ["charged", "dmg"],
    "Charge Attack": ["charged", "dmg"],
    "High Plunge": ["plunging", "high"],

    //TODO reactions
    "bloom": ["reaction", "bloom"],
    "burning": ["reaction", "burning"],
    "hyperbloom": ["reaction", "hyperbloom"],
    "overload": ["reaction", "overloaded"],
    "swirl-hydro": ["reaction", "hydroSwirl"],
    "swirl-electro": ["reaction", "electroSwirl"],
    "swirl-cryo": ["reaction", "cryoSwirl"],
    "swirl-pyro": ["reaction", "pyroSwirl"],

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
    "Freeze Bomb": ["skill", "freezeBombDmg"],
    "Chillwater Bomblets": ["skill", "chillWaterBomblets"],
    "Prophecies of Dawn": ["burst", "dmg"],

    //?---------------------Amber----------------------//
    "Fiery Rain": ["burst", "dmgPerWave"],

    //?-------------------Arlecchino-------------------//
    "Blood Debt Directive": ["skill", "sigilDmg"],
    "All is Ash (Spike)": ["skill", "spikeDmg"],
    "All is Ash (Cleave)": ["skill", "finalDmg"],
    
    //?---------------------Ayato----------------------//
    "Kamisato Art: Kyouka": ["skill", "illusionDmg"],
    "Kamisato Art: Suiyuu": ["burst", "dmg"],
    "Ayato C6": ["constellation6", "dmg"],
    
    //?---------------------Ayaka----------------------//
    //"Charge": ["charged", "dmg1"],
    "Dash": ["type", "subtype"], //! No damage
    "Hyouka": ["skill", "press"],
    "C2 Mini-Frostflake Seki no To (Bloom)": ["constellation2", "bloom"],
    "Soumetsu (Bloom)": ["burst", "bloom"],
    "C2 Mini-Frostflake Seki no To (Cutting)": ["constellation2", "dmg"],
    "Soumetsu (Cutting)": ["burst", "cutting"],
    
    //?---------------------Baizhu---------------------//
    //?---------------------Barbara--------------------//
    //?---------------------Beidou---------------------//
    
    //?---------------------Bennett--------------------//
    "Passion Overload (Press)": ["skill", "press"],
    "Fantastic Voyage": ["burst", "dmg"],
    
    //?---------------------Candace--------------------//
    //?---------------------Charlotte------------------//

    //?---------------------Chasca---------------------//
    "Spirit Reins, Shadow Hunt": ["skill", "activationDmg"],
    "Shadowhunt Shell": ["skill", "shellDmg"],
    "Shining Shadowhunt Shell (hydro)": ["skill", "shiningShellDmg_hydro"],
    "Shining Shadowhunt Shell (pyro)": ["skill", "shiningShellDmg_pyro"],
    "Shining Shadowhunt Sheel (cryo)": ["skill", "shiningShellDmg_cryo"],
    "Shining Shadowhunt Shell (electro)": ["skill", "shiningShellDmg_electro"],
    "Radiant Soulseeker Shell (hydro)": ["burst", "radiantDmg_hydro"],
    "Galesplitting Soulseeker Shell": ["burst", "galeSplittingDmg"],
    "Burning Shadowhunt Shell (pyro)": ["passive2", "pyro"],
    "Burning Shadowhunt Shell (hydro)": ["passive2", "hydro"],
    "Burning Shadowhunt Shell (electro)": ["passive2", "electro"],
    "Burning Shadowhunt Shell (cryo)": ["passive2", "cryo"],
    "Shining Shadowhunt Shell (C2)": ["constellation2", "pyro"],
    "Radiant Shadowhunt Shell (C4)": ["constellation4", "hydro"],
    
    //?--------------------Chevreuse-------------------//
    "Sniper Induced Explosion (C2)": ["constellation2", "dmg"],
    "Surging Blade (Chevreuse)": ["skill", "bladeDmg"],
    "Short-Range Rapid Interdiction Fire [Overcharged]": ["skill", "holdDmg"],
    "Secondary Explosive Shell": ["burst", "shellDmg"],
    "Explosive Grenade": ["burst", "grenadeDmg"],
    
    //?---------------------Chiori---------------------//
    "Fluttering Hasode (Upward Sweep)": ["skill", "sweepDmg"],
    "Fluttering Hasode (Tamato - Construct)": ["skill", "turretDmg"],
    "Fluttering Hasode (Tamato)": ["skill", "turretDmg"],
    "Hiyoku: Twin Blades": ["burst", "bloomDmg"],
    "Fluttering Hasode (Seize the Moment)": ["passive1", "dollDmg"],
    "Fluttering Hasode (Kinu)": ["constellation2", "dollDmg"],
    "Cleardew Cologne (A1)": ["passive1", "dmg"],

    //?---------------------Chongyun-------------------//
    //?---------------------Clorinde-------------------//
    //?---------------------Collei---------------------//
    //?---------------------Cyno-----------------------//
    //?---------------------Dehya----------------------//
    //?---------------------Diluc----------------------//
    //?---------------------Diona----------------------//
    //?---------------------Dori-----------------------//

    //?---------------------Emilie---------------------//
    "Lumidouce Case (Summon)": ["skill", "skillDmg"],
    "Lumidouce Case (Level 1)": ["skill", "level1Dmg"],
    "Lumidouce Case (Level 2)": ["skill", "level2Dmg"],
    "Spiritbreath Thorn": ["skill", "thornDmg"],

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
    "Charmed Cloudstrider": ["skill", "cloudstriderDmg"],
    "Suanni's Gilded Dance (Q)": ["burst", "smashDmg"],

    //?---------------------Ganyu----------------------//
    "Frostflake Arrow": ["charged", "frostflake"],
    "Frostflake Arrow Bloom": ["charged", "frostflakeBloom"],
    "Ice Lotus": ["skill", "dmg"],
    "Celestial Shower": ["burst", "dmg"],

    //?---------------------Gorou----------------------//
    "Inuzaka All-Round Defense": ["skill", "dmg"],
    "Juuga: Forward Unto Victory": ["burst", "dmg"],
    "Crystal Collapse": ["burst", "crystalCollapse"],
    
    //?---------------------Heizou---------------------//

    //?---------------------Hu Tao---------------------//
    "Blood Blossom": ["skill", "dmg"],
    "Spirit Soother": ["burst", "dmg"],
    "Paramita (0 dmg)": ["skill", "atk"],

    //?---------------------Itto-----------------------//
    "Arataki Kesagiri Final Slash": ["charged", "akFinal"],
    "Arataki Kesagiri Combo Slash": ["charged", "akSlash"],
    "Masatsu Zetsugi: Akaushi Burst!": ["skill", "dmg"],
    
    //?---------------------Jean-----------------------//
    //?---------------------Kaeya----------------------//
    //?---------------------Kaveh----------------------//

    //?---------------------Kazuha---------------------//
    "Kazuha A1": ["passive1", "absorb"],
    // "High Plunge": ["skill", "phigh"], //! Not sure
    "Chihayaburu": ["skill", "press"], //! Not sure
    "Kazuha Slash": ["burst", "dmg"],
    "Kazuha Slash (Dot)": ["burst", "dot"],
    "Kazuha Slash (Absorb Dot)": ["burst", "absorb"],

    //?---------------------Keqing---------------------//

    //?---------------------Kinich---------------------//
    "Loop Shot 0": ["skill", "shotDmg"],
    "Loop Shot 1": ["skill", "shotDmg"],
    "Scalespiker Cannon": ["skill", "cannonDmg"],
    "Scalespiker Cannon (C6)": ["constellation6", "dmg"],

    //?---------------------Kirara---------------------//
    //?---------------------Klee-----------------------//

    //?---------------------Kokomi---------------------//
    "Bake-Kurage": ["skill", "dmg"],
    "Nereid's Ascension": ["burst", "dmg"],
    "At Water's Edge (C1)": ["constellation1", "dmg"],

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
    "Rosula Shardshot": ["skill", "totalShardDmg"],
    "Surging Blade": ["skill", "bladeDmg"],
    "As the Sunlit Sky's Singing Salute": ["burst", "skillDmg"],
    "Cannon Fire Support": ["burst", "supportDmg"],
    "The President's Pursuit of Victory": ["burst", "supportDmg"], //! (C2)

    //!---------------------Neuvillette----------------//
    "Charged Attack: Equitable Judgment": ["charged", "judgmentDmg"],
    "O Tides, I Have Returned: Waterfall DMG": ["burst", "waterfallDmg"],
    "O Tides, I Have Returned: Skill DMG": ["burst", "skillDmg"],
    "Spiritbreath Thorn (Neuvillette)": ["skill", "thornDmg"],
    "O Tears, I Shall Repay": ["skill", "skillDmg"],

    //!---------------------Nilou----------------------//
    "Tranquility Aura": ["element", "hydro"], // No damage
    "bloom (self damage)": ["type", "subtype"], // No relevant
    "Water Wheel": ["skill", "wheelDmg"],
    "Sword Dance 0": ["skill", "dance1Dmg"],
    "Sword Dance 1": ["skill", "dance2Dmg"],
    "Dance of Haftkarsvar": ["skill", "skillDmg"],
    "Lingering Aeon": ["burst", "aeonDmg"],
    "Dance of Abzendegi: Distant Dreams, Listening Spring": ["burst", "skillDmg"],


    //?---------------------Ningguang------------------//
    //?---------------------Noelle---------------------//
    //?---------------------Ororon---------------------//
    //?---------------------Qiqi-----------------------//
    //?---------------------Raiden---------------------//
    //?---------------------Razor----------------------//

    //?---------------------Rosaria--------------------//
    "Rites of Termination (DoT)": ["burst", "dotDmg"],
    "Rites of Termination (Hit 1)": ["burst", "hit1"],
    "Rites of Termination (Hit 2)": ["burst", "hit2"],

    //?---------------------Sara-----------------------//
    //?---------------------Sayu-----------------------//
    //?---------------------Sethos---------------------//

    //?---------------------Shenhe---------------------//
    "Spring Spirit Summoning (Press)": ["skill", "press"],
    "Spring Spirit Summoning (Hold)": ["skill", "hold"],
    "Divine Maiden's Deliverance (Initial)": ["burst", "dmg"],
    "Divine Maiden's Deliverance (DoT)": ["burst", "dot"],

    //?---------------------Sigewinne------------------//

    //?---------------------Sucrose--------------------//
    "Astable Anemohypostasis Creation-6308": ["skill", "press"],
    "Forbidden Creation-Isomer 75/Type II": ["burst", "dot"],
    "Forbidden Creation-Isomer 75/Type II (Absorb)": ["burst", "cryo"],

    //?---------------------Tartaglia------------------//
    //?---------------------Thoma----------------------//
    //?---------------------Tighnari-------------------//
    //?---------------------Traveler (Anemo)-----------//
    //?---------------------Traveler (Cryo)------------//

    //?---------------------Traveler (Dendro)----------//
    "Razorgrass Blade": ["skill", "dmg"],
    "Lea Lotus Lamp": ["burst", "lampDmg"],

    //?---------------------Traveler (Electro)---------//
    //?---------------------Traveler (Geo)-------------//
    //?---------------------Traveler (Hydro)-----------//
    //?---------------------Traveler (Pyro)------------//
    //?---------------------Venti----------------------//
    //?---------------------Wanderer-------------------//
    //?---------------------Wriothesley----------------//
    //?---------------------Xiangling------------------//

    //?---------------------Xiangyun-------------------//
    "Driftcloud Wave (1 Leaps)": ["skill", "firstLeapDmg"],
    "Driftcloud Wave (2 Leaps)": ["skill", "secondLeapDmg"],
    "Driftcloud Wave (3 Leaps)": ["skill", "thirdLeapDmg"],
    "Stars Gather at Dusk (Initial)": ["burst", "instantDmg"],
    "Starwicker": ["burst", "coordinatedDmg"],

    //?---------------------Xiao-----------------------//
    
    //?---------------------Xilonen--------------------//
    "Yohual's Scratch": ["skill", "rushDmg"],
    "Blade Roller 0": ["normal", "ns0"],
    "Blade Roller 1": ["normal", "ns1"],
    "Ocelotlicue Point!": ["burst", "skillDmg"],
    
    //?---------------------Xingqiu--------------------//
    "Xingqiu Orbital": ["type", "subtype"], //! No damage
    "Guhua Sword: Fatal Rainscreen": ["skill", "press1"], //! Only first hit because both hits have same name
    "Guhua Sword: Raincutter": ["burst", "dmg"],

    //?---------------------Xinyan---------------------//
    //?---------------------Yae Miko-------------------//
    //?---------------------Yanfei---------------------//
    //?---------------------Yaoyao---------------------//

    //?---------------------Yelan----------------------//
    "Lingering Lifeline": ["skill", "dmg"],
    "Depth-Clarion Dice": ["burst", "pressDmg"],
    "Exquisite Throw": ["burst", "throwDmg"],
    "Yelan C2 Proc": ["constellation2", "arrowDmg"],
    "Breakthrough Barb": ["constellation6", "barbDmg"],

    //?---------------------Yoimiya--------------------//
    "Aurous Blaze": ["burst", "dmg"],
    "Aurous Blaze (Explode)": ["burst", "exp"],
    "Kindling (C6) - N0": ["constellation6", "0"], //! N1 * 2
    "Kindling (C6) - N1": ["constellation6", "1"], //! N2
    "Kindling (C6) - N2": ["constellation6", "2"], //! N3
    "Kindling (C6) - N3": ["constellation6", "3"], //! N4 * 2
    "Kindling (C6) - N4": ["constellation6", "4"], //! N5

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