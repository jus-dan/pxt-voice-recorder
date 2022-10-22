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
        //% block="repeat one song"
        type1 = 0x01,
        //% block="repeat all"
        type2 = 0x02,
        //% block="play one song and pause"
        type3 = 0x03,
        //% block="Play randomly"
        type4 = 0x04,
        //% block="Repeat all in the folder"
        type5 = 0x05
    }
    export enum controlType {
        //% block="Play & Pause"
        type1 = "PP",
        //% block="next"
        type2 = "NEXT",
        //% block="last"
        type3 = "LAST"
    }

    export enum promtType {
        //% block="promt ON"
        type1 = "ON",
        //% block="promt OFF"
        type2 = "OFF"
    }
    
    export enum ledType {
        //% block="LED ON"
        type1 = "ON",
        //% block="LED OFF"
        type2 = "OFF"
    }

    export enum ampType {
        //% block="amplifier ON"
        type1 = "ON",
        //% block="amplifier OFF"
        type2 = "OFF"
    }

    /**
     * @param pinRX to pinRX ,eg: SerialPin.P2
     * @param pinTX to pinTX ,eg: SerialPin.P1
    */
    //% blockId="MP3_setSerial" block="set DFPlayer-PRO RX to %pinTX| TX to %pinRX"
    //% weight=100 blockGap=20
    export function MP3_setSerial(pinTX: SerialPin, pinRX: SerialPin): void {
        MP3_tx = pinTX;
        MP3_rx = pinRX;
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
    //% blockId="MP3_testConnection" block="set DFPlayer-PRO volume to %vol"
    //% weight=100 blockGap=20
    export function MP3_testConnection(): string {
        return "NOK"
    }


    /**
     * 
    */
    //% blockId="MP3_setVol" block="set DFPlayer-PRO volume to %vol"
    //% weight=100 blockGap=20
    export function MP3_setVol(vol: NumberFormat.UInt8LE): string {
        return "NOK"
    }

    /**
    * 
   */
    //% blockId="MP3_getVol" block="set DFPlayer-PRO volume to %vol"
    //% weight=100 blockGap=20
    export function MP3_getVol(): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_setPlayMode" block="..."
    //% weight=100 blockGap=20
    export function MP3_setPlayMode(mode: playType): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_control" block="..."
    //% weight=100 blockGap=20
    export function MP3_control(mode: controlType): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_getCurFileNumber" block="..."
    //% weight=100 blockGap=20
    export function MP3_getCurFileNumber(): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_getTotalFile" block="..."
    //% weight=100 blockGap=20
    export function MP3_getTotalFile(): string {
        return "NOK"
    }


    /**
     * 
    */
    //% blockId="MP3_getFileName" block="..."
    //% weight=100 blockGap=20
    export function MP3_getFileName(): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_playSpecFile" block="..."
    //% weight=100 blockGap=20
    export function MP3_playSpecFile(path: string): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_playFileNum" block="..."
    //% weight=100 blockGap=20
    export function MP3_playFileNum(number: NumberFormat.UInt8LE): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_promt" block="..."
    //% weight=100 blockGap=20
    export function MP3_promt(mode: promtType): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_led" block="..."
    //% weight=100 blockGap=20
    export function MP3_led(mode: ledType): string {
        return "NOK"
    }

    /**
     * 
    */
    //% blockId="MP3_amplifier" block="..."
    //% weight=100 blockGap=20
    export function MP3_amplifier(mode: ampType): string {
        return "NOK"
    }

}