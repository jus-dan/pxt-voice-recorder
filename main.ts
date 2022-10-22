/**
* DFPlayer PRO with 128MB On-board High-speed Storage
*/
basic.forever(function(){
    DFPlayerPro.serialListener()
})

//% weight=0 color=#FF7F24 icon="\uf001" block="DFPlayer-PRO"
namespace DFPlayerPro 
{

    /**
     * local variables
     */
    let MP3_tx = SerialPin.P1
    let MP3_rx = SerialPin.P2
    let expectResponse = false
    let response = ""
    
    /**
     * types
     */
    export enum playType 
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
    export enum controlType 
    {
        //% block="PlayPause" blockId="Play & Pause"
        playPause = 1,
        //% block="NEXT" blockId="next"
        next = 2,
        //% block="LAST" blockId="last"
        last = 3
    }

    export enum promtType 
    {
        //% block="ON" blockId="promt ON"
        type1 = 1,
        //% block="OFF" blockId="promt OFF"
        type2 = 2
    }
    
    export enum ledType 
    {
        //% block="ON" blockId="LED ON"
        type1 = 1,
        //% block="OFF" blockId="LED OFF"
        type2 = 2
    }

    export enum ampType 
    {
        //% block="ON" blockId="amplifier ON"
        type1 = 1,
        //% block="OFF" blockId="amplifier OFF"
        type2 = 2
    }

    /**
     * @param pinRX to pinRX ,eg: SerialPin.P2
     * @param pinTX to pinTX ,eg: SerialPin.P1
    */
    //% blockId="MP3_setSerial" block="set DFPlayer-PRO RX to %pinTX| TX to %pinRX"
    //% weight=50 blockGap=20
    export function MP3_setSerial(pinTX: SerialPin, pinRX: SerialPin): void 
    {
        MP3_tx = pinTX
        MP3_rx = pinRX
        serial.setWriteLinePadding(0)
        serial.redirect(
            MP3_tx,
            MP3_rx,
            BaudRate.BaudRate115200
        )
        basic.pause(100)
    }

    /**
     * 
    */
    //% blockId="MP3_testConnection" block="test communication with DFPlayer-PRO"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_testConnection(): string 
    {
        expectResponse = true
        let command = "AT"
        writeSerial(command)
        while (expectResponse)
        {
           basic.pause(10)
        }
        return response
    }


    /**
     * 
    */
    //% blockId="MP3_setVol" block="set DFPlayer-PRO volume to %volume"
    //% weight=100 blockGap=20 volume.min=0 volume.max=30 volume.defl=10
    export function MP3_setVol(volume?: number): void 
    {
        expectResponse = true
        let command = "AT+VOL=" + volume.toString()
        writeSerial(command)
        while (expectResponse) 
        {
            basic.pause(10)
        }
    }

    /**
    * 
   */
    //% blockId="MP3_getVol" block="get DFPlayer-PRO volume"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getVol(): string 
    {
        expectResponse = true
        let command = "AT+VOL=?"
        writeSerial(command)
        while (expectResponse) 
        {
            basic.pause(10)
        }
        return response
    }

    /**
     * 
    */
    //% blockId="MP3_setPlayMode" block="Control playback mode %mode "
    //% weight=100 blockGap=20
    export function MP3_setPlayMode(mode: playType): void 
    {
        expectResponse = true
        let command = "AT+PLAYMODE=" + mode
        writeSerial(command)
        while (expectResponse) 
        {
            basic.pause(10)
        }
    }

    /**
     * 
    */
    //% blockId="MP3_control" block="Control playing %mode"
    //% weight=100 blockGap=20
    export function MP3_control(mode: controlType): void 
    {
        expectResponse = true
        let command = "AT+PLAY=" + mode
        writeSerial(command)
        while (expectResponse) {
            basic.pause(10)
        }
    }

    /**
     * 
    */
    //% blockId="MP3_getCurFileNumber" block="file number playing"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getCurFileNumber(): string 
    {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_getTotalFile" block="total number of the files"
    //% weight=100 blockGap=20
    export function MP3_getTotalFile(): string 
    {
        return "NOK"
    }


    /**
     * 
    */
    //% blockId="MP3_getFileName" block="file name playing"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getFileName(): string 
    {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_playFilePathName" block="play filename %pathName"
    //% weight=100 blockGap=20
    export function MP3_playFilePathName(pathName: string): void 
    {

    }

    /**
     * 
    */
    //% blockId="MP3_playFileNum" block="play filenumber %fileNumber"
    //% weight=100 blockGap=20
    export function MP3_playFileNum(fileNumber: number): void 
    {
        expectResponse = true
        let command = "AT+PLAYNUM=" + fileNumber.toString()
        writeSerial(command)
        while (expectResponse) 
        {
            basic.pause(10)
        }
    }

    /**
     * 
    */
    //% blockId="MP3_promtMode" block="prompt mode to %promtType"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_promtMode(mode: promtType): void 
    {

    }

    /**
     * 
    */
    //% blockId="MP3_ledMode" block="led mode to %ledType"
    //% subcategory="advanced"subcategory="advanced" weight=100 blockGap=20
    export function MP3_ledMode(mode: ledType): void 
    {
 
    }

    /**
     * 
    */
    //% blockId="MP3_amplifierMode" block="amplifier mode to %ampType"
    //% subcategory="advanced" blockExternalInputs=true weight=100 blockGap=20
    export function MP3_amplifierMode(mode: ampType): void 
    {

    }

    /**
     * send to serial with endline characters
     */
    function writeSerial(cmd: string): void
    {
        serial.writeString(cmd + "\r\n")
    }

    /**
     * serial listener for responses
     */
    export function serialListener(): void
    {
        /* read a line */
        response = serial.readUntil("\r\n")
        
        /* check if we wait for a response */
        if(expectResponse == true)
        {
            basic.showIcon(IconNames.Yes)
            /* prepare data */
            if (response.length > 0) 
            {
                response = response.replace("\r\n", "")
                /* for debugging */
                basic.showString(response)
                /* indicate response arrived */
                expectResponse = false;
            }
        }
        else
        {
            basic.showIcon(IconNames.No)
        }
    }

    

}