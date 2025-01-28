import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageCard from "../../../components/MessageCard";

const Chat = ({ navigation }) => {

  const viewMessage = () =>{
    navigation.navigate('SendMessage');
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Header title="Chats" navigation={navigation} spacing={"pt-16 pb-10"} />
        <ScrollView className="bg-white rounded-3xl px-5">
        <MessageCard 
          name={'Niña Kyla Haligado'} 
          profile={"https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-1/449043168_992002292444002_6626595497113422677_n.jpg?stp=dst-jpg_p100x100&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=OXUYlJLMtPkQ7kNvgEidn3M&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fdvo2-2.fna&oh=00_AYC-miOVTsrb03EBWKlwuGx5R_GiJSA-49FV1ta5tdRx0w&oe=66C48336"}
          time={'an hour ago'}
          incoming_messages={12}
          onPress={viewMessage}
        />
        <MessageCard 
          name={'Christine Dae'} 
          profile={"https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/450688394_8057805287576103_1159261797584389444_n.jpg?stp=dst-jpg_p100x100&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=aVSsmj6fTjoQ7kNvgEkl9vl&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl13-2.fna&oh=00_AYDRc4p7AXoGEhElJTnCFe4RFmBCVhlNQIMfe3ELndQSdQ&oe=66C5E063"}
          time={'3 hours ago'}
          incoming_messages={3}
          onPress={viewMessage}
        />
        <MessageCard 
          name={'Paul Jamin'} 
          profile={"https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/438300253_3665502947052954_2035890738893940383_n.jpg?stp=dst-jpg_p100x100&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=OH91jiP4Y20Q7kNvgEQAekr&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl13-2.fna&oh=00_AYCemhb4YYOmDumM36DscNBp1N7i3vm_S74yU0J9md7o_Q&oe=66C5F796"}
          time={'19 hours ago'}
          incoming_messages={9}
          onPress={viewMessage}
        />
        <MessageCard 
          name={'Jc Scrubs'} 
          profile={"https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/425515365_7509662035724599_3915649313882162172_n.jpg?stp=dst-jpg_p100x100&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=KzSdyoAJG3sQ7kNvgEflGQq&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl13-2.fna&oh=00_AYBiX-bnqpNvePWKcPfY7fset0RpotuHacdXcoG5SJ8NBA&oe=66C5F948"}
          time={'3 hours ago'}
          incoming_messages={'10'}
          onPress={viewMessage}
        />
        <MessageCard 
          name={'Brix D'}
          profile={"https://scontent.fmnl13-2.fna.fbcdn.net/v/t1.15752-9/448079728_991277928945616_618702115922826885_n.jpg?stp=dst-jpg_s100x100&_nc_cat=100&ccb=1-7&_nc_sid=b70caf&_nc_ohc=d2dIFQ90OhoQ7kNvgEyWJEs&_nc_ht=scontent.fmnl13-2.fna&oh=03_Q7cD1QFw1Qg8WWA9CbBElzOrt7ckOr83zUvmzdQ9shWnFwl5KA&oe=66E7A34C"}
          time={'3 hours ago'}
          incoming_messages={'1'}
          onPress={viewMessage}
        />
        <MessageCard 
          name={'Joveren Dae'} 
          profile={"https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/414672750_1408576570086412_6429540086407028142_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=50d2ac&_nc_ohc=o7Zhlrt409UQ7kNvgHwMk1L&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl13-2.fna&oh=00_AYDJYUUf_gq3C8Xbc0dDT0N7sLyfL5y8-1T_x_RuokP1wg&oe=66C603D0"}
          time={'3 hours ago'}
          incoming_messages={'10'}
          onPress={viewMessage}
        />
        <MessageCard 
          name={'Sheila Dae'} 
          profile={"https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/450258096_2672916316223124_6133134547841519965_n.jpg?stp=cp6_dst-jpg_p100x100&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=P4nHxvS7HCEQ7kNvgH5VOtp&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl13-2.fna&oh=00_AYCHgxui_k_amrSqLuCC1TQ-wDAvKsavPeCQ4wPKQGSAOw&oe=66C6029B"}
          time={'3 hours ago'}
          incoming_messages={'3'}
          onPress={viewMessage}
        />
        <MessageCard 
          name={'Jericho Abbu'} 
          profile={"https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/349165892_3137269859906370_1578376122590777132_n.jpg?stp=c0.0.100.100a_dst-jpg_p100x100&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=yvP-fl7AsxEQ7kNvgFy5WT8&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl13-2.fna&oh=00_AYCHZH9ovI2kuRIJHQ_g5ikabt4xCUeYvjuawY8Wr4N03Q&oe=66C5D8DC"}
          time={'3 hours ago'}
          incoming_messages={'3'}
          onPress={viewMessage}
        />
        <MessageCard 
          name={'Trexy Dae'} 
          profile={"https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-1/453314497_1252205005745534_4486688695057471753_n.jpg?stp=dst-jpg_p100x100&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=sZOA_WhPwEAQ7kNvgHaUYCp&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl13-2.fna&oh=00_AYCF2QbgohJWdOv6CK0GkN9A-JOHwG-qeQiKBGJHrjIn4w&oe=66C5FD65"}
          time={'3 hours ago'}
          incoming_messages={0}
          onPress={viewMessage}
        />
        </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
