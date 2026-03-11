#include <iostream>
#include <vector>
#include <limits.h>
using namespace std;

int main() {
    int n;
    cout << "Enter the number of elements: ";
    cin >> n;

    if (n < 2) {
        cout << "No 2nd largest element found" << endl;
        return 0;
    }

    vector<int> arr(n);
    cout << "Enter the elements: " << endl;
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    int largest = INT_MIN;
    int sec_largest = INT_MIN;
    int smallest = INT_MAX;

    for (int i = 0; i < n; i++) {
        if (arr[i] > largest) {
            sec_largest = largest;
            largest = arr[i];
        } else if (arr[i] > sec_largest && arr[i] != largest) {
            sec_largest = arr[i];
        }

        if (arr[i] < smallest) {
            smallest = arr[i];
        }
    }

     
        cout << "2nd largest element in the array is: " << sec_largest << endl;
    
    cout<<"smallest element in the array is: "<<smallest;

    return 0;
}
