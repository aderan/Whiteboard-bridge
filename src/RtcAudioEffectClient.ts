import { asyncCall, register } from "./bridge";
import { EventEmitter } from "events";
import { RTCEffectClient } from "@netless/slide-rtc-plugin";

export class RtcAudioEffectClient extends EventEmitter implements RTCEffectClient {
    static kAgoraAudioEffectStatePlaying = 810;
    static kAgoraAudioEffectStatePaused = 811;
    static kAgoraAudioEffectStateStopped = 813;
    static kAgoraAudioEffectStateFailed = 814;

    public constructor() {
        super();
        register("rtc", {
            audioEffectCallback: (soundId: number, state: number) => {
                switch (state) {
                    case RtcAudioEffectClient.kAgoraAudioEffectStatePlaying:
                        this.emit("play", soundId);
                        return;
                    case RtcAudioEffectClient.kAgoraAudioEffectStatePaused:
                        this.emit("pause", soundId);
                        return;
                    case RtcAudioEffectClient.kAgoraAudioEffectStateStopped:
                        this.emit("pause", soundId);
                        return;
                    case RtcAudioEffectClient.kAgoraAudioEffectStateFailed:
                        this.emit("error", soundId);
                        return;
                }
            },
            setEffectFinished: (soundId: number) => {
                this.emit("effectFinished", soundId);
            },
            effectDurationCallback: (filePath: string, duration: number) => {
                this.emit("duration", filePath, duration);
            }
        });
    }

    public getEffectsVolume(): Promise<number> {
        return asyncCall("rtc.getEffectsVolume") as Promise<number>;
    }

    public setEffectsVolume(volume: number): Promise<number> {
        return asyncCall("rtc.setEffectsVolume", volume) as Promise<number>;
    }

    public setVolumeOfEffect(soundId: number, volume: number): Promise<number> {
        return asyncCall("rtc.setVolumeOfEffect", {
            soundId,
            volume,
        }) as Promise<number>;
    }

    public playEffect(
        soundId: number,
        filePath: string,
        loopCount: number,
        pitch: number,
        pan: number,
        gain: number,
        publish: boolean,
        startPos: number
    ): Promise<number> {
        return asyncCall("rtc.playEffect", {
            soundId,
            filePath,
            loopCount,
            pitch,
            pan,
            gain,
            publish,
            startPos,
        }) as Promise<number>;
    }

    public stopEffect(soundId: number): Promise<number> {
        return asyncCall("rtc.stopEffect", soundId) as Promise<number>;
    }

    public stopAllEffects(): Promise<number> {
        return asyncCall("rtc.stopAllEffects") as Promise<number>;
    }

    public preloadEffect(
        soundId: number,
        filePath: string,
        startPos: number
    ): Promise<number> {
        return asyncCall("rtc.preloadEffect", {
            soundId,
            filePath,
            startPos,
        }) as Promise<number>;
    }

    public unloadEffect(soundId: number): Promise<number> {
        return asyncCall("rtc.unloadEffect", soundId) as Promise<number>;
    }

    public pauseEffect(soundId: number): Promise<number> {
        return asyncCall("rtc.pauseEffect", soundId) as Promise<number>;
    }

    public pauseAllEffects(): Promise<number> {
        return asyncCall("rtc.pauseAllEffects") as Promise<number>;
    }

    public resumeEffect(soundId: number): Promise<number> {
        return asyncCall("rtc.resumeEffect", soundId) as Promise<number>;
    }

    public resumeAllEffects(): Promise<number> {
        return asyncCall("rtc.resumeAllEffects") as Promise<number>;
    }

    public getEffectDuration(url: string): Promise<number> {
        return asyncCall("rtc.getEffectDuration", url) as Promise<number>;
    }

    public setEffectPosition(soundId: number, pos: number): Promise<number> {
        return asyncCall("rtc.setEffectPosition", {
            soundId,
            pos,
        }) as Promise<number>;
    }

    public getEffectCurrentPosition(soundId: number): Promise<number> {
        return asyncCall(
            "rtc.getEffectCurrentPosition",
            soundId
        ) as Promise<number>;
    }
}