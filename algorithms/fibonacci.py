def fibonacci(n):
    a, b = 0, 1
    result = []
    for _ in range(int(n)):
        result.append(a)
        a, b = b, a + b
    log(f"Fibonacci Sequence: {result}")
