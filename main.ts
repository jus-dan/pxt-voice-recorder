/**
* 
*/
basic.forever(function () {
    VoiceRecPlay.serialListener();
})

//% weight=0 color=#FF7F24 icon="\uf001" block="VoiceRecPlay"
namespace VoiceRecPlay {


    /**
     * types
     */

    export enum FunctionType {
        //% block="Music mode" blockId="Music mode"
        musicMode = 1,
        //% block="NEXT" blockId="Recording mode"
        recordMode = 2,
        //% block="LAST" blockId="Slave mode"
        slaveMode = 3
    }

    export enum PlayModeType {
        //% blockId="repeat one song"
        repeatOneSong = 1,
        //% blockId="repeat all"
        repeatAll = 2,
        //% blockId="play one song and pause"
        playOneSongAndPause = 3,
        //% blockId="Query current playing mode"
        playRandomly = 4
    }

    export enum PlayControlType {
        //% block="PlayPause" blockId="Play & Pause"
        playPause = 1,
        //% block="NEXT" blockId="next"
        next = 2,
        //% block="LAST" blockId="last"
        last = 3
    }

    export enum PromtType {
        //% block="ON" blockId="promt ON"
        promtOn = 1,
        //% block="OFF" blockId="promt OFF"
        promtOff = 2
    }

    export enum LedType {
        //% block="ON" blockId="LED ON"
        ledOn = 1,
        //% block="OFF" blockId="LED OFF"
        ledOff = 2
    }

    /**
     * local variables
     */
    let RecPlay_tx: SerialPin = SerialPin.P1;
    let RecPlay_rx: SerialPin = SerialPin.P0;
    let waitForResponse: boolean = false;
    let response: string = "";
    let originalResponse: string = "";
    let currentFunctionType: FunctionType = FunctionType.musicMode;


    /**
     * @param pinRX to pinRX ,eg: SerialPin.P1
     * @param pinTX to pinTX ,eg: SerialPin.P0
    */
    //% blockId="RecPlay_setSerial" block="set DFPlayer-PRO RX to %pinTX| TX to %pinRX"
    //% weight=50 blockGap=20
    export function RecPlay_setSerial(pinTX: SerialPin, pinRX: SerialPin): void {
        RecPlay_tx = pinTX;
        RecPlay_rx = pinRX;
        serial.setWriteLinePadding(0);
        serial.redirect(
            RecPlay_tx,
            RecPlay_rx,
            BaudRate.BaudRate115200
        );
        basic.pause(300);
    }

    /**
     * 
    */
    //% blockId="RecPlay_testConnection" block="test communication with DFPlayer-PRO"
    //% subcategory="advanced" weight=100 blockGap=20
    export function RecPlay_testConnection(): string {
        waitForResponse = true;
        let command = "AT";
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
        return response;
    }

    /**
     * 
    */
    //% blockId="RecPlay_getLastResponseMessage" block="get last response message"
    //% subcategory="advanced" weight=100 blockGap=20
    export function RecPlay_getLastResponseMessage(): string {
        return originalResponse;
    }


    /**
     * @param volume between 0-30
    */
    //% blockId="RecPlay_setVol" block="set DFPlayer-PRO volume to %volume"
    //% weight=100 blockGap=20 volume.min=0 volume.max=30 volume.defl=10
    export function RecPlay_setVol(volume?: number): void {
        waitForResponse = true;
        let command = "AT+VOL=" + volume.toString();
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }

    /**
    * 
   */
    //% blockId="RecPlay_getVol" block="get DFPlayer-PRO volume"
    //% subcategory="advanced" weight=100 blockGap=20
    export function RecPlay_getVol(): number {
        waitForResponse = true;
        let command = "AT+VOL=?";
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }

        let startIndex = response.indexOf("[");
        let endIndex = response.indexOf("]");
        /* return：VOL = [10] => try to get the "10" */
        response = response.substr(startIndex + 1, endIndex - startIndex - 1);

        return parseFloat(response);
    }

    /**
     * @param mode select play type
    */
    //% blockId="RecPlay_setPlayMode" block="Control playback mode %mode "
    //% weight=100 blockGap=20
    export function RecPlay_setPlayMode(mode: PlayModeType): void {
        waitForResponse = true;
        let command = "AT+PLAYMODE=" + mode.toString();
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }


    /**
     * @param mode select play type
    */
    //% blockId="RecPlay_setFunctionType" block="Control function mode %mode "
    //% weight=100 blockGap=20
    export function RecPlay_setFunctionType(mode: FunctionType): void {
        waitForResponse = true;

        /* store the mode in class */
        currentFunctionType = mode;

        let command = "AT+FUNCTION=" + mode.toString();
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }



    /**
     * @param mode select control type
    */
    //% blockId="RecPlay_control" block="Control playing %mode"
    //% weight=100 blockGap=20
    export function RecPlay_control(mode: PlayControlType): void {
        waitForResponse = true;
        let command = "AT+PLAY=";

        if (mode == PlayControlType.playPause) {
            command = command + "PP";
        }

        if (mode == PlayControlType.next) {
            command = command + "NEXT";
        }

        if (mode == PlayControlType.last) {
            command = command + "LAST";
        }

        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }


    /**
     * @param pathName "/test.mp3" or "foldername/song1.mp3"
    */
    //% blockId="RecPlay_playFilePathName" block="play filename %pathName"
    //% weight=100 blockGap=20
    export function RecPlay_playFilePathName(pathName: string): void {
        waitForResponse = true;
        let command = "AT+PLAYFILE=/" + pathName;
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }

    /**
     * @param fileNumber Play the file of the specified number (Play the first file if there is no such file)
    */
    //% blockId="RecPlay_playFileNum" block="play filenumber %fileNumber"
    //% weight=100 blockGap=20
    export function RecPlay_playFileNum(fileNumber: number): void {
        waitForResponse = true;
        let command = "AT+PLAYFILE=" + fileNumber.toString();
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }

    /**
     * 
    */
    //% blockId="RecPlay_record" block="record a new MP3"
    //% weight=100 blockGap=20
    export function RecPlay_record(): void {
        waitForResponse = true;
        let command = "AT+REC=RP";
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }

    /**
     * 
    */
    //% blockId="RecPlay_saveRecord" block="save recorded MP3"
    //% weight=100 blockGap=20
    export function RecPlay_saveRecord(): void {

        /* pause teh record function */
        RecPlay_record();

        waitForResponse = true;
        let command = "AT+REC=SAVE";
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }


    /**
     * 
    */
    //% blockId="RecPlay_deleteCurrentFile" block="delete the currently-playing file"
    //% weight=100 blockGap=20
    export function RecPlay_deleteCurrentFile(): void {
        waitForResponse = true;
        let command = "AT+DEL";
        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }

    /**
     * @param mode select promt type ("music" or "slave" when power up)
    */
    //% blockId="RecPlay_promtMode" block="prompt mode to %promtType"
    //% subcategory="advanced" weight=100 blockGap=20
    export function RecPlay_promtMode(mode: PromtType): void {
        waitForResponse = true;
        let command = "AT+PROMPT=";

        if (mode == PromtType.promtOn) {
            command = command + "ON";
        }
        if (mode == PromtType.promtOff) {
            command = command + "OFF";
        }

        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }

    /**
     * @param mode select LED behaviour (ON/OFF)
    */
    //% blockId="RecPlay_ledMode" block="led mode to %ledType"
    //% subcategory="advanced"subcategory="advanced" weight=100 blockGap=20
    export function RecPlay_ledMode(mode: LedType): void {
        waitForResponse = true;
        let command = "AT+LED=";

        if (mode == LedType.ledOn) {
            command = command + "ON";
        }
        if (mode == LedType.ledOff) {
            command = command + "OFF";
        }

        writeSerial(command);
        while (waitForResponse) {
            basic.pause(10);
        }
    }

    /**
     * send to serial with endline characters
     */
    function writeSerial(cmd: string): void {
        serial.writeString(cmd + "\r\n");
    }

    /**
     * serial listener for responses
     */
    export function serialListener(): void {
        /* check if we wait for a response */
        if (waitForResponse == true) {
            /* read a line */
            originalResponse = serial.readUntil("\r\n");
            /* prepare data */
            if (originalResponse.length > 0) {
                response = originalResponse.replace("\r\n", "");
                /* indicate response arrived */
                waitForResponse = false;
            }
        }
    }
}
