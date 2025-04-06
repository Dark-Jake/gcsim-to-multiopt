<script lang="ts">
    import { copy } from 'svelte-copy';
    import { onMount } from 'svelte';
    import Prism from 'prismjs';
    import 'prismjs/themes/prism-tomorrow.css';
    import 'prismjs/components/prism-json';

    import { readGZ, readJSON } from '$lib';
    import { getCharacterAbils } from "$lib/gcsim-to-multiopt";
    import { convertAbils } from '$lib/gcsim-to-multiopt/convert';
    import getAbilities from '$lib/gcsim-to-multiopt/config/abil_name';
    import statNameConvert from '$lib/gcsim-to-multiopt/config/stat_name';
    import resistNameConvert from '$lib/gcsim-to-multiopt/config/resist_name';

    import type { Sample } from '$lib/gcsim-to-multiopt/gcsim_types';
    import type { CustomMultiTarget } from '$lib/gcsim-to-multiopt/go_types';

    import { initKonamiCode } from '$lib/utils/konamiCode';
    import PauseIcon from '$lib/components/PauseIcon.svelte';
    import PlayIcon from '$lib/components/PlayIcon.svelte';

    let isNeonTheme = false;
    let isPlaying = false;
    let audio: HTMLAudioElement | null = null;
    const audioFiles = [
        '/gcsim-to-multiopt/sound1.mp3',
        '/gcsim-to-multiopt/sound2.mp3',
        '/gcsim-to-multiopt/sound3.mp3',
        '/gcsim-to-multiopt/sound4.mp3',
    ];

    interface ErrorContext {
        message: string;
        raw?: any;
        suggestion?: string;
    }

    let sample: Sample | null = null;
    let charName = '';
    let charNames: string[] = [];
    let ignoredMods: string[] = [];
    let availabledMods: string[] = [];
    let target: CustomMultiTarget | null = null;
    let errors: string[] = [];
    let errorContexts: ErrorContext[] = [];
    let addConvert = '';
    let highlightedJson = '';
    let isDragging = false;
    let currentFileName = '';
    let expandedErrors: Set<number> = new Set();
    let showToast = false;
    let toastTimeout: ReturnType<typeof setTimeout>;
    let configName = '';

    function toggleError(index: number) {
        if (expandedErrors.has(index)) {
            expandedErrors.delete(index);
        } else {
            expandedErrors.add(index);
        }
        expandedErrors = expandedErrors; // trigger reactivity
    }

    onMount(() => {
        const randomAudioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
        audio = new Audio(randomAudioFile); // Ruta al archivo de música
        audio.loop = true;
        
        initKonamiCode(() => {
            console.log("¡Konami Code activado!");
            isNeonTheme = true;

            // Activar tema y reproducir música
            document.body.classList.add('neon-retro-theme');
            console.log("Estado isNeonTheme:", isNeonTheme); // Depuración
            if (audio) {
                audio.play().catch((error) => {
                    console.error("Error al reproducir el audio:", error);
                });
                isPlaying = true; // Actualizar el estado
            }
        });
        if (target) {
            updateHighlightedJson();
        }
        return () => {
            if (toastTimeout) clearTimeout(toastTimeout);
            if (audio) {
                audio.pause();
                audio = null;
            }
        };
    });

    function toggleAudio() {
        if (!audio) return;

        if (isPlaying) {
            audio.pause(); // Detener el audio
        } else {
            audio.play().catch((error) => {
                console.error("Error al reproducir el audio:", error);
            }); // Reanudar el audio
        }

        isPlaying = !isPlaying; // Alternar el estado
    }
    
    function updateCharacterAbils() {
        if (!sample) {
            return;
        }
        errors = [];
        errorContexts = [];
        const [abilities, mods] = getCharacterAbils(sample, charName, ignoredMods);
        availabledMods = mods;

        if (abilities.length === 0) {
            return;
        }

        const convert = getAbilities();
        try {
            const addedConvert = JSON.parse(addConvert || '{}');
            Object.assign(convert, addedConvert);
        } catch (e) {
            errors.push(`Invalid JSON in additional abilities: ${e}`);
            errorContexts.push({
                message: `Invalid JSON in additional abilities: ${e}`,
                raw: addConvert,
                suggestion: "Check that your JSON is properly formatted with quotes around keys and values"
            });
            return;
        }

        const [newTarget, newErrors] = convertAbils(abilities, convert);
        target = newTarget;
        errors = newErrors.map(e => e.message);
        
        // Crear contexto para cada error
        errorContexts = errors.map(error => {
            const context: ErrorContext = {
                message: error
            };

            if (error.includes('Unknown ability')) {
                const abilityName = error.match(/"([^"]+)"/)?.[1];
                if (abilityName && abilities) {
                    const ability = abilities.find(a => a.name === abilityName);
                    if (ability) {
                        context.raw = {
                            name: ability.name,
                            buffs: ability.buffs,
                            resists: ability.resists,
                            reaction: ability.reaction,
                            infusion: ability.infusion,
                            defShred: ability.defShred
                        };
                        context.suggestion = `Add this ability to the conversion map below with appropriate type and subtype`;
                    }
                }
            } else if (error.includes('Unknown stat')) {
                const statName = error.match(/"([^"]+)"/)?.[1];
                if (statName) {
                    context.raw = {
                        stat: statName,
                        validStats: Object.keys(statNameConvert)
                    };
                    context.suggestion = `Use one of the valid stat names shown above`;
                }
            } else if (error.includes('Unknown element')) {
                const elementName = error.match(/"([^"]+)"/)?.[1];
                if (elementName) {
                    context.raw = {
                        element: elementName,
                        validElements: Object.keys(resistNameConvert)
                    };
                    context.suggestion = `Use one of the valid element names shown above`;
                }
            }

            return context;
        });

        if (target) {
            updateHighlightedJson();
        }
    };

    function handleDragEnter(e: DragEvent) {
        e.preventDefault();
        isDragging = true;
    }

    function handleDragLeave(e: DragEvent) {
        e.preventDefault();
        isDragging = false;
    }

    function handleDragOver(e: DragEvent) {
        e.preventDefault();
    }

    async function handleDrop(e: DragEvent) {
        e.preventDefault();
        isDragging = false;
        
        const file = e.dataTransfer?.files[0];
        if (!file) return;
        
        await processFile(file);
    }

    async function processFile(file: File) {
        const sampleFile = file.name;
        currentFileName = sampleFile;
        if (sampleFile.endsWith('.gz')) {
            sample = await readGZ(file);
        } else if (sampleFile.endsWith('.json')) {
            sample = await readJSON(file);
        } else {
            alert('Unsupported file type.');
            return;
        }

        if (!sample) {
            return;
        }
        charNames = sample.character_details?.map((detail) => detail.name) ?? [];
        charName = charNames[0] ?? '';
    }

    async function handleFileInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
        const file = event.currentTarget.files?.[0];
        if (!file) return;
        
        await processFile(file);
    }

    function updateTarget() {
        if (!charName || !sample) return;

        const abils = getCharacterAbils(sample, charName);
        if (!abils) return;

        const [newTarget, errors] = convertAbils(abils, getAbilities());
        if (errors.length > 0) {
            errorContexts = errors.map(err => ({
                message: err.message,
                raw: err.raw,
                suggestion: err.suggestion
            }));
            target = null;
        } else if (newTarget) {
            errorContexts = [];
            target = {
                name: configName || "New config",
                targets: [newTarget]
            };
            updateHighlightedJson();
        }
    }

    function updateHighlightedJson() {
        if (target) {
            target.name = configName || "New config";
            const jsonString = JSON.stringify(target, null, 2);
            highlightedJson = Prism.highlight(jsonString, Prism.languages.json, 'json');
        }
    }

    function handleCopy() {
        showToast = true;
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            showToast = false;
        }, 2000);
    }

    $: if (target) {
        updateHighlightedJson();
    }

    $: ignoredMods = ignoredMods.filter(mod => availabledMods.includes(mod));

    function showCopyToast() {
        showToast = true;
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            showToast = false;
        }, 2000);
    }

    $: if (configName) {
        updateHighlightedJson();
    }
</script>

<style lang="scss">
    :global(body) {
        margin: 0;
        background-color: #1a1b1e;
        color: #e4e5e7;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: #fff;
        text-align: center;
        background: linear-gradient(45deg, #646cff, #42b883);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    h2 {
        font-size: 1.5rem;
        margin: 2rem 0 1rem 0;
    }

    button {
        background: #646cff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.2s ease;

        &:hover {
            background: #7c82ff;
        }

        &:active {
            background: #4c53ff;
        }
    }

    :global(body.neon-retro-theme) {
        background: #070410; /* Fondo oscuro */
        color: #00ffcc; /* Texto en color cian neón */
        font-family: 'Press Start 2P', monospace; /* Fuente pixelada */
        font-size: 0.8rem; /* Tamaño reducido */
        margin: 0;
        padding: 0;
        overflow-x: hidden; /* Evitar desbordamiento horizontal */
    }

    :global(body.neon-retro-theme h1),
    :global(body.neon-retro-theme h2),
    :global(body.neon-retro-theme h3) {
        font-size: 1.5rem; /* Tamaño reducido para encabezados */
        text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff; /* Sombra de neón magenta */
    }

    :global(body.neon-retro-theme p) {
        font-size: 0.9rem; /* Tamaño reducido para párrafos */
        text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 20px #00ffcc; /* Sombra de neón cian */
    }

    :global(body.neon-retro-theme button) {
        background: #ff00ff; /* Botón magenta */
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 1rem;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff; /* Sombra de neón */
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    :global(body.neon-retro-theme button:hover) {
        transform: scale(1.1);
        box-shadow: 0 0 15px #ff00ff, 0 0 30px #ff00ff; /* Sombra más intensa al pasar el mouse */
    }

    :global(body.neon-retro-theme .neon-text) {
        font-size: 2rem;
        animation: flicker 1.5s infinite alternate;
    }

    @keyframes flicker {
        0% {
            text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc, 0 0 20px #00ffcc;
        }
        100% {
            text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 40px #00ffcc, 0 0 80px #00ffcc;
        }
    }

    :global(body.neon-retro-theme .upload-image-container) {
    text-align: center;
    margin-top: 1rem;
    position: relative;
    }

    :global(body.neon-retro-theme .image-wrapper) {
        position: relative;
        display: inline-block;
    }

    :global(body.neon-retro-theme .upload-image) {
        width: 500px;
        height: auto;
        border-radius: 8px;
        display: block;

        /* Efecto de borde neon */
        filter: drop-shadow(0 0 5px #011c36) drop-shadow(0 0 10px #011c36) drop-shadow(0 0 15px #011c36);
        transition: transform 0.3s ease, filter 0.3s ease;

        /* Animación al pasar el mouse (opcional) */
        &:hover {
            transform: scale(1.05);
            filter: drop-shadow(0 0 7.5px #011c36) drop-shadow(0 0 15px #011c36) drop-shadow(0 0 20px #011c36);
        }
    }
    
    .audio-control {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 9999;
    }

    .audio-control button {
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.3s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        padding: 0;
    }

    .audio-control button svg {
        width: 60%;
        height: 60%;
        display: block;
    }

    .audio-control button:hover {
        background: rgba(0, 0, 0, 0.8);
        transform: scale(1.1);
    }

    .audio-control button:active {
        transform: scale(0.95);
    }
    
    .upload-image-container {
    text-align: center;
    margin-top: 1rem;
    position: relative;
    }

    .image-wrapper {
        position: relative;
        display: inline-block;
    }

    .upload-image {
        filter: drop-shadow(
            0 0 10px rgba(0, 0, 0, 0.8)
        );
        width: 500px;
        height: auto;
        border-radius: 8px;
        display: block;
        margin-left: auto;
        margin-right: auto;

        animation: jump 2s infinite;    
    }

    @keyframes jump {
        0% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0); }
    }

    .hint-area {
        position: absolute;
        top: 20%;
        left: 30%;
        width: 40%;
        height: 20%;
        background: rgba(255, 255, 255, 0);
        border-radius: 8px;
        cursor: pointer;
        opacity: 0;
        transition: background 0.4s ease, opacity 0.3s ease;
        overflow: hidden;
    }

    .hint-area:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.06);
        box-shadow: 0 0 10px rgba(0, 255, 200, 0.3);
    }

    .hint-area::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(0, 255, 204, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        opacity: 0;
        transition: none;
    }

    .hint-area:hover::after {
        animation: radarPing 1.5s infinite ease-out;
    }

    @keyframes radarPing {
        0% {
            width: 0;
            height: 0;
            opacity: 0.6;
        }
        70% {
            width: 200%;
            height: 200%;
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

    .hint-message {
        position: absolute;
        bottom: -3rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.85);
        color: #00ffcc;
        padding: 0.6rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        opacity: 0;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
        font-family: 'Share Tech Mono', monospace;
        box-shadow: 0 0 10px rgba(0, 255, 204, 0.4);

        transition: opacity 0.4s ease;
    }

    .hint-area:hover + .hint-message {
        opacity: 1;
    }

    .hint-message::before {
        content: attr(data-text);
        display: inline-block;
        animation: glitchReveal 4s steps(30, end) forwards, flicker 1.8s infinite;
        opacity: 1;
        white-space: nowrap;
    }
    
    @keyframes glitchReveal {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    @keyframes flicker {
        0%, 100% {
            opacity: 1;
            text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc;
        }
        20% {
            opacity: 0.8;
        }
        40% {
            opacity: 0.5;
        }
        60% {
            opacity: 0.9;
            text-shadow: 0 0 2px #00ffcc, 0 0 5px #00ffcc;
        }
        80% {
            opacity: 0.6;
        }
    }

    .upload-section {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        margin-bottom: 2rem;
        border: 2px dashed rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;

        &:hover, &.dragging {
            border-color: #646cff;
            background: rgba(255, 255, 255, 0.1);
        }

        .current-file {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 0.5rem;

            .file-name {
                color: #e4e5e7;
                font-weight: 500;
                word-break: break-all;
            }

            .change-file {
                color: #646cff;
                font-size: 0.9rem;
                opacity: 0.8;
                transition: opacity 0.2s ease;

                &:hover {
                    opacity: 1;
                }
            }
        }

        p {
            margin-bottom: 1rem;
            color: #a1a1aa;
        }

        input[type="file"] {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
        }

        .upload-icon {
            display: block;
            font-size: 2rem;
            color: #646cff;
            margin-bottom: 1rem;
        }

        .upload-text {
            color: #e4e5e7;
            margin-bottom: 0.5rem;
        }

        .upload-hint {
            font-size: 0.9rem;
            color: #a1a1aa;
        }
    }

    .controls {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;

        label {
            min-width: 100px;
        }
    }

    select, input[type="file"] {
        background: #2c2c2c;
        border: 1px solid #3f3f3f;
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 1rem;
        transition: all 0.2s ease;

        &:hover {
            border-color: #646cff;
        }

        &:focus {
            outline: none;
            border-color: #646cff;
            box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
        }
    }

    .mods-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 0.75rem;
        margin: 1rem 0;
    }

    .mod-item {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.05);
        padding: 0.75rem;
        border-radius: 6px;
        transition: background 0.2s ease;
        word-break: break-word;
        min-height: 40px;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        input[type="checkbox"] {
            accent-color: #646cff;
            margin-top: 3px;
        }

        label {
            flex: 1;
            font-size: 0.9rem;
            line-height: 1.4;
            cursor: pointer;
        }
    }

    .error-section {
        background: rgba(255, 87, 87, 0.1);
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem 0;

        ul {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
            list-style: none;

            li {
                color: #ff5757;
                margin-bottom: 0.75rem;
                position: relative;

                &::before {
                    content: "⚠️";
                    position: absolute;
                    left: -1.5rem;
                }

                .error-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    
                    &:hover {
                        opacity: 0.9;
                    }

                    .toggle-icon {
                        font-size: 0.8rem;
                        color: #e4e5e7;
                        transition: transform 0.3s ease;
                        display: inline-block;
                        width: 1rem;
                        text-align: center;

                        &.expanded {
                            transform: rotate(90deg);
                        }
                    }
                }

                .error-details {
                    overflow: hidden;
                    max-height: 0;
                    opacity: 0;
                    transition: max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease;
                    margin-top: 0;
                    
                    &.expanded {
                        max-height: none;
                        opacity: 1;
                        margin-top: 0.5rem;
                    }

                    .error-content {
                        color: #e4e5e7;
                        font-size: 0.9rem;
                        padding: 0 0 0.5rem 1.5rem;
                        border-left: 2px solid #e13238;

                        .raw-data {
                            margin-top: 1rem;
                            background: rgba(0, 0, 0, 0.2);
                            padding: 0.75rem;
                            border-radius: 4px;
                            font-family: 'Fira Code', monospace;
                            font-size: 0.85rem;
                            white-space: pre-wrap;
                            
                            .label {
                                color: #a1a1aa;
                                display: block;
                                margin-bottom: 0.5rem;
                            }
                        }

                        .suggestion {
                            margin-top: 1rem;
                            padding: 0.5rem;
                            background: #646cff1a;
                            border-radius: 4px;
                            border-left: 2px solid #646cff;
                        }
                    }
                }
            }
        }

        p {
            color: #e4e5e7;
            margin: 1rem 0 0.5rem 0;
        }
    }

    textarea {
        width: 100%;
        min-height: 150px;
        background: #2c2c2c;
        border: 1px solid #3f3f3f;
        color: #fff;
        padding: 1rem;
        border-radius: 6px;
        font-family: 'Fira Code', monospace;
        margin: 1rem 0;
        resize: vertical;
        box-sizing: border-box;

        &:focus {
            outline: none;
            border-color: #646cff;
            box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
        }
    }

    .copy-section {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin: 1rem 0;

        button {
            background: #42b883;
            
            &:hover {
                background: #3aa876;
            }
        }
    }

    .result-section {
        background: rgba(66, 184, 131, 0.1);
        border-radius: 12px;
        padding: 2rem;
        margin: 2rem 0;

        h2 {
            margin: 0 0 1rem 0;
        }

        .result-container {
            position: relative;
            
            pre {
                margin: 0;
                border-radius: 8px;
                max-height: 400px;
                overflow-y: auto;
                background: #2c2c2c;
                padding: 1rem;
                font-family: 'Fira Code', monospace;
                border: 1px solid rgba(0, 184, 131, 0.3);

                /* Estilo para Firefox */
                scrollbar-width: thin;
                scrollbar-color: rgba(66, 184, 131, 0.5) rgba(44, 44, 44, 0.3);

                /* Estilo para Chrome/Safari/Edge */
                &::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                &::-webkit-scrollbar-track {
                    background: rgba(44, 44, 44, 0.3);
                    border-radius: 4px;
                }

                &::-webkit-scrollbar-thumb {
                    background: rgba(66, 184, 131, 0.5);
                    border-radius: 4px;
                    transition: background 0.2s ease;

                    &:hover {
                        background: rgba(66, 184, 131, 0.7);
                    }
                }

                &::-webkit-scrollbar-corner {
                    background: transparent;
                }
            }

            .copy-button {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: #646cff;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: background-color 0.2s ease;

                &:hover {
                    background: #7c82ff;
                }

                &:active {
                    background: #4c53ff;
                }
            }
        }
    }

    .toast-container {
        position: fixed;
        bottom: 2rem;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        pointer-events: none;
        z-index: 1000;
    }

    .toast {
        background: rgba(23, 23, 23, 0.9);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        background-clip: padding-box;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        color: #e4e5e7;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(1rem);
        transition: opacity 0.2s ease, transform 0.2s ease;

        &.show {
            opacity: 1;
            transform: translateY(0);
        }

        .check-icon {
            color: #4ade80;
        }
    }

    :global(code[class*="language-"]) {
        text-shadow: none !important;
    }

    :global(pre[class*="language-"]) {
        text-shadow: none !important;
    }

    :global(.token.property) {
        color: hsl(125, 100%, 60%) !important; 
    }

    :global(.token.property:has(+ .token.operator + .token.punctuation + .token.property)) {
        color: hsl(339, 100%, 60%) !important; 
    }

    :global(.token.property:has(+ .token.operator + .token.punctuation + .token.property:has(+ .token.operator + .token.punctuation + .token.property))) {
        color: hsl(4, 100%, 60%) !important; 
    }

    :global(.token.property:has(+ .token.operator + .token.number)) {
        color: hsl(36, 100%, 60%) !important; 
    }

    :global(.token.string) {
        color: hsl(187, 100%, 60%) !important; 
    }

    :global(.token.number) {
        color: hsl(59, 100%, 60%) !important; 
    }

    :global(.token.punctuation) {
        color: hsl(302, 100%, 60%) !important; 
    }

    :global(.token.operator) {
        color: #c9d1d9 !important; 
    }

    :global(.token.boolean) {
        color: #ff1100 !important; 
    }

    .input-group {
        margin-bottom: 1rem;

        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #e4e5e7;
            font-size: 0.9rem;
        }

        input[type="text"] {
            width: 100%;
            padding: 0.5rem;
            border-radius: 6px;
            border: 1px solid #3f3f3f;
            background: #2c2c2c;
            color: #fff;
            font-size: 0.9rem;
            transition: border-color 0.2s ease;

            &:focus {
                outline: none;
                border-color: #646cff;
            }

            &::placeholder {
                color: rgba(255, 255, 255, 0.3);
            }
        }
    }

    .credit {
    font-size: 0.85rem;
    color: #d1d5db;
    text-align: center;
    margin-top: -2rem;
    margin-bottom: 1rem;
    font-style: italic;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.8s ease-out forwards, pulse 4s ease-in-out 1s infinite;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-2px);
    }
}

.credit a {
    text-decoration: none;
}

.credit a:hover code {
    color: #93c5fd;
    text-shadow: 0 0 12px #60a5fa;
}


/* Hover */
.credit:hover {
    color: #ffffff;
    transform: scale(1.02);
}

.credit code {
    font-family: 'Fira Code', monospace;
    color: #60a5fa;
    background: transparent;
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from {
        text-shadow: 0 0 2px #60a5fa;
    }
    to {
        text-shadow: 0 0 10px #60a5fa, 0 0 20px #60a5fa;
    }
}

   
    .layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: none;
    }

    main {
        flex: 1;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
    }

    footer {
    background: linear-gradient(to right, rgba(30, 30, 30, 0.95), rgba(40, 40, 40, 0.95));
    color: #d1d5db;
    text-align: center;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-style: italic;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    margin-top: 2rem;
    position: relative;
    border-top: 2px solid rgba(255, 255, 255, 0.1);
}

    footer::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(30, 30, 30, 0.2), rgba(30, 30, 30, 0.8));
        z-index: -1;
        opacity: 0.3;
    }

    footer p {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        line-height: 1.6;
    }

    footer a {
        color: hsl(142, 100%, 70%);
        font-weight: 500;
        text-decoration: none;
        transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease;
        font-family: 'Roboto', sans-serif;
    }

    footer a:hover {
        color: hsl(144, 100%, 80%);
        text-shadow: 0 0 8px hsl(144, 100%, 70%);
        text-decoration: underline;
        transform: translateY(-3px);
    }

    footer a:active {
        transform: translateY(0);
    }
</style>

<svelte:head>
    <title>GCSim to GO-MultiOpt</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Fira+Code&display=swap" rel="stylesheet">
</svelte:head>


<div class="layout">
    <main>
    <h1>GCSim to GO-MultiOpt</h1>
    <div class='credit'>
        Enhanced by 
        <a href="https://discord.com/users/723426524585525300" target="_blank" rel="noopener noreferrer">
          <code>DarkJake#6238</code>
        </a>
      </div>      
    <div 
        class="upload-section"
        class:dragging={isDragging}
        on:dragenter={handleDragEnter}
        on:dragleave={handleDragLeave}
        on:dragover={handleDragOver}
        on:drop={handleDrop}
        role="button"
        aria-label="Upload file zone"
        tabindex="0"
    >
        {#if sample == null}
            <span class="upload-icon">📁</span>
            <p class="upload-text">Drop your file here or click to upload</p>
            <p class="upload-hint">Run the sim, open the "Sample" tab and press "Download"</p>
        {:else}
            <div class="current-file">
                <span class="file-name">{currentFileName}</span>
                <span class="change-file">(click or drop to change file)</span>
            </div>
            <p class="upload-hint">Current file loaded and ready</p>
        {/if}
        <input
            type="file"
            accept=".gz,.json"
            on:change={handleFileInput}
        />
    </div>

    {#if sample == null}
        <div class="upload-image-container">
            <div class="image-wrapper">
                <img 
                    src="/gcsim-to-multiopt/GCSim-to-GO.png"
                    alt="Upload hint" 
                    class="upload-image"
            />
            <!-- Área interactiva -->
            <div class="hint-area"></div>
            <!-- Mensaje oculto -->
            <div class="hint-message" data-text="Ancient patterns echo through pixels past... A famous sequence that saved lives in 8 bits... Can you bring it back to life?"></div>
        </div>
    </div>
    {/if}

    {#if charNames.length > 0}
        <div class="controls">
            <div class="input-group">
                <label for="configName">Config Name (optional)</label>
                <input 
                    type="text" 
                    id="configName"
                    bind:value={configName}
                    placeholder="Enter configuration name"
                />
            </div>

            <div class="input-group">
                <label for="charSelect">Select Character</label>
                <select id="charSelect" bind:value={charName}>
                    {#each charNames as name}
                        <option value={name}>{name}</option>
                    {/each}
                </select>
            </div>
        
            {#if sample != null}
                <button on:click={updateCharacterAbils}>Generate</button>
            {/if}
        </div>
    {/if}
    
    {#if availabledMods.length > 0}
        <h2>Ignored Mods</h2>
        <div class="mods-grid">
            {#each availabledMods as mod}
                <div class="mod-item">
                    <input type="checkbox" bind:group={ignoredMods} value={mod} id={mod} />
                    <label for={mod}>{mod}</label>
                </div>
            {/each}
        </div>
    {/if}

    {#if errors.length > 0}
        <div class="error-section">
            <h2>Errors</h2>
            <ul>
                {#each errorContexts as error, i}
                    <li>
                        <div 
                            class="error-header"
                            on:click={() => toggleError(i)}
                            role="button"
                            tabindex="0"
                            on:keydown={(e) => e.key === 'Enter' && toggleError(i)}
                        >
                            <span class="toggle-icon" class:expanded={expandedErrors.has(i)}>▶</span>
                            {error.message}
                        </div>
                        <div class="error-details" class:expanded={expandedErrors.has(i)}>
                            <div class="error-content">
                                {#if error.message.includes('Unknown ability')}
                                    This ability name was not found in the conversion map. You can add it manually below using the format:
                                    {#if error.raw}
                                        <div class="raw-data">
                                            <span class="label">Raw ability data:</span>
                                            {JSON.stringify(error.raw, null, 2)}
                                        </div>
                                        <div class="suggestion">
                                            Suggested fix: Add to the conversion map below:<br>
                                            "{error.raw.name}": ["type", "subtype"]
                                        </div>
                                    {/if}
                                {:else if error.message.includes('Unknown stat')}
                                    This stat type is not recognized. Common stats are: atk, def, hp, cr, cd, dmg_bonus, etc.
                                    {#if error.raw}
                                        <div class="raw-data">
                                            <span class="label">Invalid stat:</span>
                                            {error.raw.stat}
                                            <span class="label">Valid stats:</span>
                                            {error.raw.validStats.join(', ')}
                                        </div>
                                    {/if}
                                {:else if error.message.includes('Unknown element')}
                                    Invalid element type. Valid elements are: pyro, hydro, electro, cryo, dendro, anemo, geo, physical
                                    {#if error.raw}
                                        <div class="raw-data">
                                            <span class="label">Invalid element:</span>
                                            {error.raw.element}
                                            <span class="label">Valid elements:</span>
                                            {error.raw.validElements.join(', ')}
                                        </div>
                                    {/if}
                                {/if}
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>

            <p>You can manually add abilities that aren't on the site:</p>
            <textarea
                id="addConvert"
                bind:value={addConvert}
                placeholder={`{
    "Normal 0": ["normal", "0"],
    "Bake-Kurage": ["skill", "dmg"],
    "Sea-Dyed Foam": ["artifact:OceanHuedClam", "heal"]
}`}
            ></textarea>
        </div>
    {/if}

    {#if target}
        <div class="result-section">
            <h2>Result</h2>
            <div class="result-container">
                <pre><code class="language-json">{@html highlightedJson}</code></pre>
                <button 
                    class="copy-button"
                    use:copy={JSON.stringify(target, null, 2)}
                    on:click={handleCopy}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy to Clipboard
                </button>
            </div>
        </div>
    {/if}

    <div class="toast-container">
        <div class="toast" class:show={showToast}>
            <span class="check-icon">✓</span>
            Copied to clipboard!
        </div>
    </div>

<!-- Botón para detener/reanudar el audio -->
{#if isNeonTheme}
    <div class="audio-control">
        <button on:click={toggleAudio}>
            {#if isPlaying}
                <PauseIcon width="24" height="24" />
            {:else}
                <PlayIcon width="24" height="24" />
            {/if}
        </button>
    </div>
{/if}

</main>

<footer>
    <p>This application is a modern reinterpretation of 
        <a href="https://imring.github.io/gcsim-to-multiopt/" target="_blank" rel="noopener noreferrer">
            imring.github.io/gcsim-to-multiopt/
        </a>, enhancing the user experience and adding new features.
    </p>
</footer>
</div>