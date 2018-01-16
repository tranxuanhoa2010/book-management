REM unregister the dll as ActiveX library
%windir%\Microsoft.NET\Framework64\v2.0.50727\regasm.exe %windir%\System32\Bytescout.Spreadsheet.dll /tlb:%windir%\System32\Bytescout.Spreadsheet.tlb /unregister 

REM removing Bytescout.Spreadsheet.dll
DEL %windir%\System32\Bytescout.Spreadsheet.dll
DEL %windir%\System32\Bytescout.Spreadsheet.tlb

