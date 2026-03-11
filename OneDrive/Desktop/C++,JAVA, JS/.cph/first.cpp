#include<bits/stdc++.h>
using namespace std;

void soln() 
{
    int n, k;
    cin >> n >> k;
    vector<int> p(n);
    for (int i = 0; i < n; ++i) {
        cin >> p[i];
    }
    
    sort(p.begin(), p.end());
    
    vector<int> prefix(n + 1, 0);
    for (int i = 1; i <= n; ++i) {
        prefix[i] = prefix[i - 1] + p[i - 1];
    }
    
    vector<int> mc(n + 1, INT_MAX);
    mc[0] = 0;  
    
    for (int m = 1; m <= n; ++m) {
        mc[m] = prefix[m];
        if (m > k) {
            mc[m] = min(mc[m], mc[m - k - 1] + prefix[m] - prefix[m - k]);
        }
    }
    
    for (int m = 1; m <= n; ++m) 
    {
        cout << mc[m] << " ";
    }
    cout << endl;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        soln();
    }
    return 0;
}