REM change default folder (required for Vista and higher)
CD %~dp0

REM coping Bytescout.Spreadsheet.dll into %systemroot%\SYSWOW64\ as COM server libraries
copy Bytescout.Spreadsheet.dll %systemroot%\SYSWOW64\Bytescout.Spreadsheet.dll
copy Bytescout.Spreadsheet.tlb %systemroot%\SYSWOW64\Bytescout.Spreadsheet.tlb

REM register the dll as ActiveX library in .NET x86 (on x64)
%windir%\Microsoft.NET\Framework64\v2.0.50727\regasm.exe %systemroot%\SYSWOW64\Bytescout.Spreadsheet.dll /tlb:%systemroot%\SYSWOW64\Bytescout.Spreadsheet.tlb /codebase
