a = int(input("Enter The Value A: "))
b = int(input("Enter The Value B: "))

s= input("Enter the sign: ")

match(s):
    case "+":
        print(a+b)
    case "-":
        print(a-b)
    case "*":
        print(a*b)
    case "/":
        if b==0:
            print("error by 0")
            exit
        print(a/b)
    case _:
        print("Wrong Sign")