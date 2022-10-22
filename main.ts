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
    let waitForResponse = false
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
        serial.setRxBufferSize(32)
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
        waitForResponse = true
        let command = "AT"
        writeSerial(command)
        while (waitForResponse)
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
        waitForResponse = true
        let command = "AT+VOL=" + volume.toString()
        writeSerial(command)
        while (waitForResponse)
        {
            basic.pause(10)
        }
    }

    /**
    * 
   */
    //% blockId="MP3_getVol" block="get DFPlayer-PRO volume"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getVol(): number 
    {
        waitForResponse = true
        let command = "AT+VOL=?"
        writeSerial(command)
        while (waitForResponse)
        {
            basic.pause(10)
        }

        let startIndex = response.indexOf("[")
        let endIndex = response.indexOf("]")
        /* return：VOL = [10] => try to get the "10" */
        response = response.substr(startIndex+1, endIndex-startIndex-1)

        return parseFloat(response)
    }

    /**
     * 
    */
    //% blockId="MP3_setPlayMode" block="Control playback mode %mode "
    //% weight=100 blockGap=20
    export function MP3_setPlayMode(mode: playType): void 
    {
        waitForResponse = true
        let command = "AT+PLAYMODE=" + mode
        writeSerial(command)
        while (waitForResponse)
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
        waitForResponse = true
        let command = "AT+PLAY=" + mode
        writeSerial(command)
        while (waitForResponse) 
        {
            basic.pause(10)
        }
    }

    /**
     * 
    */
    //% blockId="MP3_getCurFileNumber" block="file number playing"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getCurFileNumber(): number 
    {
        waitForResponse = true
        let command = "AT+QUERY=1"
        writeSerial(command)
        while (waitForResponse) {
            basic.pause(10)
        }
        return parseFloat(response)
    }

    /**
     * 
    */
    //% blockId="MP3_getTotalFileNumber" block="total number of the files"
    //% weight=100 blockGap=20
    export function MP3_getTotalFileNumber(): number
    {
        waitForResponse = true
        let command = "AT+QUERY=2"
        writeSerial(command)
        while (waitForResponse) {
            basic.pause(10)
        }
        return parseFloat(response)
    }


    /**
     * 
    */
    //% blockId="MP3_getFileName" block="file name playing"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getFileName(): string 
    {
        waitForResponse = true
        let command = "AT+QUERY=5"
        writeSerial(command)
        while (waitForResponse) 
        {
            basic.pause(20)
        }
        return response
    }

    /**
     * 
    */
    //% blockId="MP3_playFilePathName" block="play filename %pathName"
    //% weight=100 blockGap=20
    export function MP3_playFilePathName(pathName: string): void 
    {
        waitForResponse = true
        let command = "AT+PLAYFILE=" + pathName
        writeSerial(command)
        while (waitForResponse) {
            basic.pause(10)
        }
    }

    /**
     * 
    */
    //% blockId="MP3_playFileNum" block="play filenumber %fileNumber"
    //% weight=100 blockGap=20
    export function MP3_playFileNum(fileNumber: number): void 
    {
        waitForResponse = true
        let command = "AT+PLAYNUM=" + fileNumber.toString()
        writeSerial(command)
        while (waitForResponse)
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
        waitForResponse = true
        let command = "AT+PROMPT="

        if(mode == promtType.promtOn)
        {
            command = command + "ON"
        }
        if(mode == promtType.promtOff)
        {
            command = command + "OFF"
        }

        writeSerial(command)
        while (waitForResponse) 
        {
            basic.pause(10)
        }
    }

    /**
     * 
    */
    //% blockId="MP3_ledMode" block="led mode to %ledType"
    //% subcategory="advanced"subcategory="advanced" weight=100 blockGap=20
    export function MP3_ledMode(mode: ledType): void 
    {
        waitForResponse = true
        let command = "AT+LED="

        if (mode == ledType.ledOn)
        {
            command = command + "ON"
        }
        if (mode == ledType.ledOff)
        {
            command = command + "OFF"
        }

        writeSerial(command)
        while (waitForResponse) 
        {
            basic.pause(10)
        }
    }

    /**
     * 
    */
    //% blockId="MP3_amplifierMode" block="amplifier mode to %ampType"
    //% subcategory="advanced" blockExternalInputs=true weight=100 blockGap=20
    export function MP3_amplifierMode(mode: ampType): void 
    {
        waitForResponse = true
        let command = "AT+AMP="

        if (mode == ampType.ampOn) 
        {
            command = command + "ON"
        }
        if (mode == ampType.ampOff) 
        {
            command = command + "OFF"
        }

        writeSerial(command)
        while (waitForResponse) 
        {
            basic.pause(10)
        }
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
        if (waitForResponse == true)
        {
            /* prepare data */
            if (response.length > 0) 
            {
                response = response.replace("\r\n", "")
                /* indicate response arrived */
                waitForResponse = false;
            }
        }
        else
        {

        }
    }

    

}