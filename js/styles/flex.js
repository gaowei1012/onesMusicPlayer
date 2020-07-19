'use strict';
const rowCenter={
  flexDirection: 'row',
  alignItems:"center",
}
const columnCenter={
  flexDirection: 'column',
  alignItems:"center",
}

export const flexRowCenter= {
  justifyContent:'center',
  ...rowCenter
}
export const flexRowAround= {
  justifyContent:'center',
  ...rowCenter
}

export const flexRowEnd= {
  ...rowCenter,
  justifyContent:'flex-end'
}
export const flexRowSpaceBtween= {
  ...rowCenter,
  justifyContent:'space-between'
}
export const flexRowStart= {
  ...rowCenter,
  justifyContent:'flex-start'
}
export const flexColumnCenter= {
  justifyContent:'center',
  ...columnCenter
}
export const flexColumnAround={
  ...columnCenter,
  justifyContent:'space-around'
}
export const flexColumnSpaceBtween={
  ...columnCenter,
  justifyContent:'space-between'
}
export const flexColumnEnd= {
  ...columnCenter,
  justifyContent:'flex-end'
}
export const flexColumnStart={
  ...columnCenter,
  justifyContent:'flex-start'
}

