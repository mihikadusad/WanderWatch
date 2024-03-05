def process_file(txt_file):
    result = []
    with open(txt_file, 'r') as file:
        lines = file.readlines()
        for i in range(0, len(lines), 3):
            if i+2 < len(lines):
                num = lines[i+2].strip().split('_')
                num1 = int(num[0][1:])
                num2 = int(num[1][:-1])
                if num1 < num2:
                    if [num1, num2] not in result:
                        result.append([num1, num2])
                else:
                    if [num2, num1] not in result:
                        result.append([num2, num1])
    print(len(result))
    return result

# Example usage:
txt_file = 'testing.txt'  # Replace with the path to your TXT file
result = process_file(txt_file)
print(result)
