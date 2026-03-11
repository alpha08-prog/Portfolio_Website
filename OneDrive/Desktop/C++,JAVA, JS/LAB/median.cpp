#include<bits/stdc++.h>
using namespace std;


double findMedian(vector<int>& numbers) {
    sort(numbers.begin(), numbers.end());
    size_t size = numbers.size();
    
    if (size % 2 == 0) {
        // Even elements
        return (numbers[size / 2 - 1] + numbers[size / 2]) / 2.0;
    } else {
        // Odd elements
        return numbers[size / 2];
    }
}

int main() {
    vector<int> numbers;
    int n, input;
    
    cout << "Enter the number of elements: ";
    cin >> n;
    
    cout << "Enter " << n << " numbers:\n";
    for (int i = 0; i < n; ++i) {
        cin >> input;
        numbers.push_back(input);
    }
    
    double median = findMedian(numbers);
   cout << "Median: " << median <<endl;
    
    return 0;
}
