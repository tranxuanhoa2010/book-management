REM change default folder (required for Vista and higher)
CD %~dp0

REM coping Bytescout.Spreadsheet.dll into /System32/ as COM server libraries
copy Bytescout.Spreadsheet.dll %windir%\System32\Bytescout.Spreadsheet.dll
copy Bytescout.Spreadsheet.tlb %windir%\System32\Bytescout.Spreadsheet.tlb

REM register the dll as ActiveX library in .NET x64
%windir%\Microsoft.NET\Framework64\v2.0.50727\regasm.exe %windir%\System32\Bytescout.Spreadsheet.dll /tlb:%windir%\System32\Bytescout.Spreadsheet.tlb /codebase
