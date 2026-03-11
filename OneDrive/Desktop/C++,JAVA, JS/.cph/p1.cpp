#include <iostream>
#include <vector>
#include <string>

void solve() {
    std::string s;
    std::cin >> s;
    int n = s.length();
    int count_operations = 0;
    
    for (int i = 0; i < n; i++) {
        if (s[i] == '1') {
            count_operations++;
            while (i < n && s[i] == '1') i++;
        }
    }
    
    std::cout << count_operations << "\n";
}

int main() {
    int t;
    std::cin >> t;
    
    while (t--) {
        solve();
    }
    
    return 0;
}