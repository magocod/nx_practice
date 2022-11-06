export const MATH_SERVICE = 'MATH_SERVICE';

export enum Cmd {
  sum = 'sum'
}

// patterns

export const cmdSumPattern =  { cmd: Cmd.sum }
export type CmdSumData = number[];
export type CmdSumResult = number;
