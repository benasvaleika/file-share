export enum MessageEnum {
  INITIAL = 'initial',
  ROOMID = 'roomid',
  CHAT_MESSAGE = 'chatmessage',
  CURR_ROOM_USERS = 'currroomusers',
  FILE_TRANS = 'filetrans',
  FILE_TRANS_CANCEL = 'filetranscancel',
  FILE_TRANS_REJECT = 'filetransreject',
  FILE_TRANS_DROP = 'filetransdrop',
  FILE_TRANS_ACCEPT = 'filetransaccept',
  RTC_SDP_OFFER = 'rtcsdpoffer',
  RTC_SDP_ANSWER = 'rtcsdpanswer',
  RTC_ICE_CANDIDATE = 'rtcicecandidate',
}

export enum TransferStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inprogress',
}
