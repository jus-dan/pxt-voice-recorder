/**
* DFPlayer PRO with 128MB On-board High-speed Storage
*/
basic.forever(function(){
    DFPlayerPro.serialListener();
})

//% weight=0 color=#FF7F24 icon="\uf001" block="DFPlayer-PRO"
namespace DFPlayerPro 
{

    /**
     * local variables
     */
    let MP3_tx: SerialPin = SerialPin.P1;
    let MP3_rx: SerialPin = SerialPin.P0;
    let waitForResponse: boolean = false;
    let response: string = "";
    let originalResponse: string = "";
    
    /**
     * types
     */
    export enum PlayType 
    {
        //% blockId="repeat one song"
        repeatOneSong = 0x01,
        //% blockId="repeat all"
        repeatAll = 0x02,
        //% blockId="play one song and pause"
        playOneSongAndPause = 0x03,
        //% blockId="Play randomly"
        playRandomly = 0x04,
        //% blockId="Repeat all in the folder"
        repeatAllInFolder = 0x05
    }
    export enum ControlType 
    {
        //% block="PlayPause" blockId="Play & Pause"
        playPause = 1,
        //% block="NEXT" blockId="next"
        next = 2,
        //% block="LAST" blockId="last"
        last = 3
    }

    export enum PromtType 
    {
        //% block="ON" blockId="promt ON"
        promtOn = 1,
        //% block="OFF" blockId="promt OFF"
        promtOff = 2
    }
    
    export enum ledType 
    {
        //% block="ON" blockId="LED ON"
        ledOn = 1,
        //% block="OFF" blockId="LED OFF"
        ledOff = 2
    }

    export enum ampType 
    {
        //% block="ON" blockId="amplifier ON"
        ampOn = 1,
        //% block="OFF" blockId="amplifier OFF"
        ampOff = 2
    }

    /**
     * @param pinRX to pinRX ,eg: SerialPin.P1
     * @param pinTX to pinTX ,eg: SerialPin.P0
    */
    //% blockId="MP3_setSerial" block="set DFPlayer-PRO RX to %pinTX| TX to %pinRX"
    //% weight=50 blockGap=20
    export function MP3_setSerial(pinTX: SerialPin, pinRX: SerialPin): void
    {
        MP3_tx = pinTX;
        MP3_rx = pinRX;
        serial.setWriteLinePadding(0);
        serial.redirect(
            MP3_tx,
            MP3_rx,
            BaudRate.BaudRate115200
        );
        basic.pause(100);
    }

    /**
     * 
    */
    //% blockId="MP3_testConnection" block="test communication with DFPlayer-PRO"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_testConnection(): string 
    {
        waitForResponse = true;
        let command = "AT";
        writeSerial(command);
        while (waitForResponse)
        {
            basic.pause(10);
        }
        return response;
    }

    /**
     * 
    */
    //% blockId="MP3_getLastResponseMessage" block="get last response message"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getLastResponseMessage(): string 
    {
        return originalResponse;
    }


    /**
     * @param volume between 0-30
    */
    //% blockId="MP3_setVol" block="set DFPlayer-PRO volume to %volume"
    //% weight=100 blockGap=20 volume.min=0 volume.max=30 volume.defl=10
    export function MP3_setVol(volume?: number): void 
    {
        waitForResponse = true;
        let command = "AT+VOL=" + volume.toString();
        writeSerial(command);
        while (waitForResponse)
        {
            basic.pause(10);
        }
    }

    /**
    * 
   */
    //% blockId="MP3_getVol" block="get DFPlayer-PRO volume"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getVol(): number 
    {
        waitForResponse = true;
        let command = "AT+VOL=?";
        writeSerial(command);
        while (waitForResponse)
        {
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
    //% blockId="MP3_setPlayMode" block="Control playback mode %mode "
    //% weight=100 blockGap=20
    export function MP3_setPlayMode(mode: PlayType): void 
    {
        waitForResponse = true;
        let command = "AT+PLAYMODE=" + mode.toString();
        writeSerial(command);
        while (waitForResponse)
        {
            basic.pause(10);
        }
    }

    /**
     * @param mode select control type
    */
    //% blockId="MP3_control" block="Control playing %mode"
    //% weight=100 blockGap=20
    export function MP3_control(mode: ControlType): void 
    {
        waitForResponse = true;
        let command = "AT+PLAY=";

        if (mode == ControlType.playPause) 
        {
            command = command + "PP";
        }

        if (mode == ControlType.next) 
        {
            command = command + "NEXT";
        }

        if (mode == ControlType.last) 
        {
            command = command + "LAST";
        }

        writeSerial(command);
        while (waitForResponse) 
        {
            basic.pause(10);
        }
    }

    /**
     * 
    */
    //% blockId="MP3_getCurFileNumber" block="file number playing"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getCurFileNumber(): number 
    {
        waitForResponse = true;
        let command = "AT+QUERY=1";
        writeSerial(command);
        while (waitForResponse) 
        {
            basic.pause(10);
        }
        return parseFloat(response);
    }

    /**
     * 
    */
    //% blockId="MP3_getTotalFileNumber" block="total number of the files"
    //% weight=100 blockGap=20
    export function MP3_getTotalFileNumber(): number
    {
        waitForResponse = true;
        let command = "AT+QUERY=2";
        writeSerial(command);
        while (waitForResponse) 
        {
            basic.pause(10);
        }
        return parseFloat(response);
    }


    /**
     * 
    */
    //% blockId="MP3_getFileName" block="file name playing"
    //% subcategory="advanced" weight=100 blockGap=20
    /*
    export function MP3_getFileName(): string 
    {
        waitForResponse = true;
        let command = "AT+QUERY=5";
        writeSerial(command);
        while (waitForResponse) 
        {
            basic.pause(10);
        }
        return response;
    }
    */

    /**
     * @param pathName "/test.mp3" or "foldername/song1.mp3"
    */
    //% blockId="MP3_playFilePathName" block="play filename %pathName"
    //% weight=100 blockGap=20
    export function MP3_playFilePathName(pathName: string): void 
    {
        waitForResponse = true;
        let command = "AT+PLAYFILE=/" + pathName;
        writeSerial(command);
        while (waitForResponse) 
        {
            basic.pause(10);
        }
    }

    /**
     * @param fileNumber Play the file of the specified number (Play the first file if there is no such file)
    */
    //% blockId="MP3_playFileNum" block="play filenumber %fileNumber"
    //% weight=100 blockGap=20
    export function MP3_playFileNum(fileNumber: number): void 
    {
        waitForResponse = true;
        let command = "AT+PLAYNUM=" + fileNumber.toString();
        writeSerial(command);
        while (waitForResponse)
        {
            basic.pause(10);
        }
    }

    /**
     * @param mode select promt type ("music" or "slave" when power up)
    */
    //% blockId="MP3_promtMode" block="prompt mode to %promtType"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_promtMode(mode: PromtType): void 
    {
        waitForResponse = true;
        let command = "AT+PROMPT=";

        if(mode == PromtType.promtOn)
        {
            command = command + "ON";
        }
        if(mode == PromtType.promtOff)
        {
            command = command + "OFF";
        }

        writeSerial(command);
        while (waitForResponse) 
        {
            basic.pause(10);
        }
    }

    /**
     * @param mode select LED behaviour (ON/OFF)
    */
    //% blockId="MP3_ledMode" block="led mode to %ledType"
    //% subcategory="advanced"subcategory="advanced" weight=100 blockGap=20
    export function MP3_ledMode(mode: ledType): void 
    {
        waitForResponse = true;
        let command = "AT+LED=";

        if (mode == ledType.ledOn)
        {
            command = command + "ON";
        }
        if (mode == ledType.ledOff)
        {
            command = command + "OFF";
        }

        writeSerial(command);
        while (waitForResponse) 
        {
            basic.pause(10);
        }
    }

    /**
     * @param mode switch amplifier ON/OFF to safe energy
    */
    //% blockId="MP3_amplifierMode" block="amplifier mode to %ampType"
    //% subcategory="advanced" blockExternalInputs=true weight=100 blockGap=20
    export function MP3_amplifierMode(mode: ampType): void 
    {
        waitForResponse = true;
        let command = "AT+AMP=";

        if (mode == ampType.ampOn) 
        {
            command = command + "ON";
        }
        if (mode == ampType.ampOff) 
        {
            command = command + "OFF";
        }

        writeSerial(command);
        while (waitForResponse) 
        {
            basic.pause(10);
        }
    }

    /**
     * send to serial with endline characters
     */
    function writeSerial(cmd: string): void
    {
        serial.writeString(cmd + "\r\n");
    }

    /**
     * serial listener for responses
     */
    export function serialListener(): void
    {
        /* check if we wait for a response */
        if (waitForResponse == true)
        {
            /* read a line */
            originalResponse = serial.readUntil("\r\n");
            /* prepare data */
            if (originalResponse.length > 0)
            {
                response = originalResponse.replace("\r\n", "");
                /* indicate response arrived */
                waitForResponse = false;
            }
        }
    }

    

}
