// import type { ExecException } from 'child_process';
import { execSync } from "child_process";

export function start(cmdStr: string, cmdPath = "") {
  function runExec(command: string) {
    try {
      const option = cmdPath === "" ? {} : { cwd: cmdPath };
      return execSync(command, { ...option, encoding: "utf8" });
    } catch (error) {
      return error;
    }
  }
  return runExec(cmdStr);
}
