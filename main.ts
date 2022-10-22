/**
* DFPlayer PRO with 128MB On-board High-speed Storage
*/


//% weight=0 color=#FF7F24 icon="\uf001" block="DFPlayer-PRO"
namespace DFPlayerPro {
    serial.onDataReceived("E", () => {
    })

    /**
     * local variables
     */
    let MP3_tx = SerialPin.P1
    let MP3_rx = SerialPin.P2

    /**
     * types
     */
    export enum playType {
        //% blockId="repeat one song"
        type1 = 0x01,
        //% blockId="repeat all"
        type2 = 0x02,
        //% blockId="play one song and pause"
        type3 = 0x03,
        //% blockId="Play randomly"
        type4 = 0x04,
        //% blockId="Repeat all in the folder"
        type5 = 0x05
    }
    export enum controlType {
        //% block="PP" blockId="Play & Pause"
        type1 = 1,
        //% block="NEXT" blockId="next"
        type2 = 2,
        //% block="LAST" blockId="last"
        type3 = 3
    }

    export enum promtType {
        //% block="ON" blockId="promt ON"
        type1 = 1,
        //% block="OFF" blockId="promt OFF"
        type2 = 2
    }
    
    export enum ledType {
        //% block="ON" blockId="LED ON"
        type1 = 1,
        //% block="OFF" blockId="LED OFF"
        type2 = 2
    }

    export enum ampType {
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
    export function MP3_setSerial(pinTX: SerialPin, pinRX: SerialPin): void {
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
    export function MP3_testConnection(): string {
        let command = "AT"
        writeSerial(command)
        basic.pause(100)
        return "OK"
    }


    /**
     * 
    */
    //% blockId="MP3_setVol" block="set DFPlayer-PRO volume to %volume"
    //% weight=100 blockGap=20 volume.min=0 volume.max=30 volume.defl=10
    export function MP3_setVol(volume?: number): void {
        let command = "AT+VOL=" + volume.toString()
        writeSerial(command)
        basic.pause(100)
    }

    /**
    * 
   */
    //% blockId="MP3_getVol" block="get DFPlayer-PRO volume"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getVol(): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_setPlayMode" block="Control playback mode %mode "
    //% weight=100 blockGap=20
    export function MP3_setPlayMode(mode: playType): void {

    }

    /**
     * 
    */
    //% blockId="MP3_control" block="Control playing %mode"
    //% weight=100 blockGap=20
    export function MP3_control(mode: controlType): void {

    }

    /**
     * 
    */
    //% blockId="MP3_getCurFileNumber" block="file number playing"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getCurFileNumber(): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_getTotalFile" block="total number of the files"
    //% weight=100 blockGap=20
    export function MP3_getTotalFile(): string {
        return "NOK"
    }


    /**
     * 
    */
    //% blockId="MP3_getFileName" block="file name playing"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_getFileName(): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_playFilePathName" block="play filename %pathName"
    //% weight=100 blockGap=20
    export function MP3_playFilePathName(pathName: string): void {

    }

    /**
     * 
    */
    //% blockId="MP3_playFileNum" block="play filenumber %fileNumber"
    //% weight=100 blockGap=20
    export function MP3_playFileNum(fileNumber: number): void {

    }

    /**
     * 
    */
    //% blockId="MP3_promtMode" block="prompt mode to %promtType"
    //% subcategory="advanced" weight=100 blockGap=20
    export function MP3_promtMode(mode: promtType): void {

    }

    /**
     * 
    */
    //% blockId="MP3_ledMode" block="led mode to %ledType"
    //% subcategory="advanced"subcategory="advanced" weight=100 blockGap=20
    export function MP3_ledMode(mode: ledType): void {
 
    }

    /**
     * 
    */
    //% blockId="MP3_amplifierMode" block="amplifier mode to %ampType"
    //% subcategory="advanced" blockExternalInputs=true weight=100 blockGap=20
    export function MP3_amplifierMode(mode: ampType): void {

    }

    /**
     * send to serial with endline characters
     */
    function writeSerial(cmd: string): void{
        serial.writeString(cmd + "\r\n")
    }

}