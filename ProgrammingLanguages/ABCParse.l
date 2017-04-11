/* jcalc.l - a JFlex specification file for generating a lexical analyzer
   for a simple integer calculator*/

//Note: in C/C++ Flex, the "user code" section is at the bottom instead
import java.io.*; //this isn't really needed, just to show how it works

%%

%public
/*%implements ABC.Lexer*/
%int
%debug
%standalone

%{

public Integer yylval;
public Integer getLVal()
{
    return yylval;
}

public void yyerror(String msg)
{
    System.err.println(msg);
}

%}

 /*In C/C++ Flex, you would lose the "=" for these.*/

delim = [\r\n]
ws = [ ]+
header = [{X:}{T:}{M:}{L:}{K:}]
digit = [0-9]
number = {digit}+
note = [A-G]
fraction= {digit}\/{digit}

%%

 /*Ignore whitespace*/
{ws} { /*ignore*/ }

\( { return '('; }
\) { return ')'; }
\+ { return '+'; }
\- { return '-'; }
\* { return '*'; }
\/ { return '/'; }
\; { return ';'; }
\: { return ':'; }
\| { return '|'; }
\] { return ']'; }

{header} { yylval = new Integer(yytext().charAt(0));
        	return yylval; }
{number} { yylval = new Integer(Integer.parseInt(yytext()));
			return yylval; }
=======
/* jcalc.l - a JFlex specification file for generating a lexical analyzer
   for a simple integer calculator*/

//Note: in C/C++ Flex, the "user code" section is at the bottom instead
import java.io.*; //this isn't really needed, just to show how it works
import java_cup.runtime.*;

%%

%public
// %implements ABC.Lexer
%unicode
%line
%column
%cup
%debug
%standalone

%{

public String yylval;
public String getLVal()
{
    return yylval;
}

/**
 * Return a new Symbol with the given token id, and with the current line and
 * column numbers.
 */

private Symbol newSym(int tokenId) {
    return new Symbol(tokenId, yyline, yycolumn);
}

/**
 * Return a new Symbol with the given token id, the current line and column
 * numbers, and the given token value.  The value is used for tokens such as
 * identifiers and numbers.
 */
private Symbol newSym(int tokenId, Object value) {
    return new Symbol(tokenId, yyline, yycolumn, value);
}

public void yyerror(String msg)
{
    System.err.println(msg);
}

%}

 /*In C/C++ Flex, you would lose the "=" for these.*/

delim = [\r\n]
ws = [ ]+
headerLetter = [XTMLK]
digit = [0-9]
number = {digit}+
letter = [A-Za-z]+
note = [A-G]
fraction= {number}\/{number}
alphanumeric = ({number}|{letter})
header = {headerLetter}:\ *({alphanumeric}+|fraction)

%%

 /*Ignore whitespace*/
{ws} { /*ignore*/ }

<<EOF>> { return newSym(0); }
// \( { return '('; }
// \) { return ')'; }
// \+ { return '+'; }
// \- { return '-'; }
// \* { return '*'; }
// \/ { return '/'; }
// \; { return ';'; }
// \: { return ':'; }
// \| { return '|'; }
// \] { return ']'; }

{header} { return newSym(100, yytext()); }
{number} { return newSym(101, yytext()); }