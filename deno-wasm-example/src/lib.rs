fn fib_sub(n: i32, acc1: i64, acc2: i64) -> i64 {
    if n < 1 {
        acc1
    } else {
        fib_sub(n - 1, acc1 + acc2, acc1)
    }
}

#[no_mangle]
pub extern "C" fn fib(n: i32) -> i64 {
    fib_sub(n, 0, 1)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = fib(3);
        assert_eq!(result, 2);
    }
}
