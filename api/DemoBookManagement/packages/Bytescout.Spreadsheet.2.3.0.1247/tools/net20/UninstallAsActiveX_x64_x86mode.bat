REM unregister the dll as ActiveX library
%windir%\Microsoft.NET\Framework64\v2.0.50727\regasm.exe %systemroot%\SYSWOW64\Bytescout.Spreadsheet.dll /tlb:%systemroot%\SYSWOW64\Bytescout.Spreadsheet.tlb /unregister 

REM removing Bytescout.Spreadsheet.dll
DEL %systemroot%\SYSWOW64\Bytescout.Spreadsheet.dll
DEL %systemroot%\SYSWOW64\Bytescout.Spreadsheet.tlb

