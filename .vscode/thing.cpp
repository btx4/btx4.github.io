// paste your entire program 
#include <iostream>

double temperatureMean(double new_temperature[], const int TEMP_SIZE){
    double sum = 0;
    for(int i = 0; i < TEMP_SIZE; i++){
        sum += new_temperature[i];
    }
    return sum/((double) TEMP_SIZE);
}

double temperatureRange(double new_temperature[], const int TEMP_SIZE){
    int min = new_temperature[0];
    int max = new_temperature[0];
    for(int i = 0; i < TEMP_SIZE; i++){
        if(new_temperature[i]>max){
        max = new_temperature[i];
        }
        if(new_temperature[i]<min){
        min = new_temperature[i];
        }
    }
    return(max - min);
}

void temperatureDelta(double new_temperature[], double old_temperature[], double delta[], const int TEMP_SIZE){
    for(int i = 0; i < TEMP_SIZE; i++){
        delta[i] = new_temperature[i]-old_temperature[i];
    }
}

int main(){
}
}