/* jcalc.l - a JFlex specification file for generating a lexical analyzer
   for a simple integer calculator*/

//Note: in C/C++ Flex, the "user code" section is at the bottom instead
import java.io.*; //this isn't really needed, just to show how it works

%%

%public
%implements JCalc.Lexer
%int

%{

public Double yylval;
public Double getLVal()
{
    return yylval;
}

public void yyerror(String msg)
{
    System.err.println(msg);
}

%}

 /*In C/C++ Flex, you would lose the "=" for these.*/

delim = [ \t\r\n]
ws = {delim}+
digit = [0-9]
number = {digit}+(\.{digit}+)?

%%

 /*Ignore whitespace*/
{ws} { /*ignore*/ }

\( { return '('; }
\) { return ')'; }
\+ { return '+'; }
\- { return '-'; }
\* { return '*'; }
\/ { return '/'; }
; { return ';'; }

{number} { yylval = new Double(yytext());
           return NUMBER; }
