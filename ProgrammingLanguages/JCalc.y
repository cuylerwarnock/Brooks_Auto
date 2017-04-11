//Bison parser for JCalc (Java icalc)
//Copyright (c) 2017 Patrick Simmons
//License is GPLv3 or later

%language "Java"
%define public
%define parser_class_name {JCalc}
%define api.value.type {Double}

%code imports {
     import java.io.*;
 }

%code {
     public static void main(String[] args) throws IOException
     {
          JCalc parser = new JCalc(new Yylex(new InputStreamReader(System.in)));
          while(parser.parse())
               System.out.println("Answer: "+parser.value);

          System.out.println("Bye.");
     }
 }

%code {
     public double value;
 }

//The only token that's not a single ASCII character is NUMBER
%token NUMBER

//Highest precedence operators are at bottom
%left '+' '-'
%left '*' '/'

%%

Program:        Program Line;
        |       Line;

Line:           Expression ';' { value = $1.doubleValue();
                                 System.out.println("Answer: "+value); }
        ;

Expression:     Expression '+' Expression { $$ = new Double($1.doubleValue() + $3.doubleValue()); }
        |       Expression '-' Expression { $$ = new Double($1.doubleValue() - $3.doubleValue()); }
        |       Expression '*' Expression { $$ = new Double($1.doubleValue() * $3.doubleValue()); }
        |       Expression '/' Expression { $$ = new Double($1.doubleValue() / $3.doubleValue()); }
        |       Parenthetical { $$ = $1; }
        |       Expression Parenthetical { $$ = $1 * $2; }
        |       Parenthetical Expression { $$ = $1 * $2; }
        |       NUMBER { $$ = new Double($1.doubleValue()); }
        ;

Parenthetical: '(' Expression ')' { $$ = $2; }
