// Hier kann man Tests durchführen; diese Datei wird nicht kompiliert, wenn dieses Paket als Erweiterung verwendet wird.
// press reset button to  reset state counter
input.onButtonPressed(Button.A, function () {
    state += 1
    DFPlayerPro.MP3_setSerial(SerialPin.P0, SerialPin.P1)
    basic.showNumber(state)
})
input.onButtonPressed(Button.B, function () {
    if (state == 0) {
        basic.showString(DFPlayerPro.MP3_getLastResponseMessage())
    } else if (state == 1) {
        DFPlayerPro.MP3_ledMode(DFPlayerPro.ledType.ledOn)
    } else if (state == 2) {
        DFPlayerPro.MP3_ledMode(DFPlayerPro.ledType.ledOff)
    } else if (state == 3) {
        DFPlayerPro.MP3_promtMode(DFPlayerPro.PromtType.promtOn)
    } else if (state == 4) {
        DFPlayerPro.MP3_promtMode(DFPlayerPro.PromtType.promtOff)
    } else if (state == 5) {
        DFPlayerPro.MP3_amplifierMode(
            DFPlayerPro.ampType.ampOn
        )
    } else if (state == 6) {
        DFPlayerPro.MP3_amplifierMode(
            DFPlayerPro.ampType.ampOff
        )
    } else if (state == 7) {
        basic.showString(DFPlayerPro.MP3_testConnection())
    } else if (state == 8) {
        basic.showNumber(DFPlayerPro.MP3_getVol())
    } else if (state == 9) {
        basic.showNumber(DFPlayerPro.MP3_getCurFileNumber())
    } else if (state == 10) {
        basic.showString("DFPlayerPro.MP3_getFileName() not supported")
    } else if (state == 11) {
        DFPlayerPro.MP3_setVol(10)
    } else if (state == 12) {
        DFPlayerPro.MP3_setVol(2)
    } else if (state == 13) {
        basic.showNumber(DFPlayerPro.MP3_getTotalFileNumber())
    } else if (state == 14) {
        DFPlayerPro.MP3_playFileNum(1)
    } else if (state == 15) {
        DFPlayerPro.MP3_playFileNum(3)
    } else if (state == 16) {
        DFPlayerPro.MP3_playFilePathName("/001.mp3")
    } else if (state == 17) {
        DFPlayerPro.MP3_playFilePathName("/003.mp3")
    } else if (state == 18) {
        DFPlayerPro.MP3_control(DFPlayerPro.ControlType.playPause)
    } else if (state == 19) {
        DFPlayerPro.MP3_control(DFPlayerPro.ControlType.next)
    } else if (state == 20) {
        DFPlayerPro.MP3_control(DFPlayerPro.ControlType.last)
    } else if (state == 21) {
        DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.repeatOneSong)
    } else if (state == 22) {
        DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.repeatAll)
    } else if (state == 23) {
        DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.playOneSongAndPause)
    } else if (state == 24) {
        DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.playRandomly)
    } else if (state == 25) {
        DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.repeatAllInFolder)
    } else {
        basic.showIcon(IconNames.No)
    }
    basic.showString(DFPlayerPro.MP3_getLastResponseMessage())
    basic.showNumber(state)
})
let state = 0
state = 0
basic.showNumber(state)
