#include <iostream>
#include <vector>
using namespace std;

int findMaxFibonacciness(int a1, int a2, int a4, int a5) {
    int maxFib = 0;
    vector<int> potentialA3;
    
    potentialA3.push_back(a4 - a2);
    potentialA3.push_back(a5 - a4);
    potentialA3.push_back(a1 + a2);
    
    for(int a3 : potentialA3) {
        int currentFib = 0;
        
        if(a1 + a2 == a3) {
            currentFib++;
        }
        
        if(a2 + a3 == a4) {
            currentFib++;
        }
        
        if(a3 + a4 == a5) {
            currentFib++;
        }
        
        maxFib = max(maxFib, currentFib);
    }
    
    return maxFib;
}

int main() {
    int t;
    cin >> t;
    
    while(t--) {
        int a1, a2, a4, a5;
        cin >> a1 >> a2 >> a4 >> a5;
        cout << findMaxFibonacciness(a1, a2, a4, a5) << endl;
    }
    
    return 0;
}