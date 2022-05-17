from flask import Flask,json, jsonify,request
from numpy import indices
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import re
from pandas.core.frame import DataFrame
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
# nltk.download('punkt')





app=Flask(__name__)

global usr_input         ########### stores the user input sent from frontend
usr_input = ' ' 
result = []

def ML():
    df = pd.read_csv("hadith.csv")
    df.drop('Index',axis=1,inplace=True)

    df=df.replace({"Ablutions (Wudu')":'Ablutions','Bathing (Ghusl)':'Bathing','Rubbing hands and feet with dust (Tayammum)':'Tayammum','Prayers (Salat)':'Salat','Times of the Prayers':'Prayer_Time','Call to Prayers (Adhaan)':'Adhaan','Friday Prayer':'Friday_Prayer'})
    df=df.replace({'The Two Festivals (Eids)':'Eid','Invoking Allah for Rain (Istisqaa)':'Rain',"Prostration During Recital of Qur'an":'Quran Prostration','Shortening the Prayers (At-Taqseer)':'prayer shortening','Prayer at Night (Tahajjud)':'night prayer','Virtues of Prayer at Masjid Makkah and Madinah':'masjid','Actions while Praying':'praying actions','Forgetfulness in Prayer':'prayer forgetfulness', "Funerals (Al-Janaa'iz)":'funeral','Obligatory Charity Tax (Zakat)':'zakat','Hajj (Pilgrimage)':'hajj','`Umrah (Minor pilgrimage)':'umrah','Pilgrims Prevented from Completing the Pilgrimage':'incomplete pilgrims'})
    df=df.replace({'Penalty of Hunting while on Pilgrimage':'hunting penalty','Virtues of Madinah':'madinah virtues','Praying at Night in Ramadaan (Taraweeh)':'taraweeh','Virtues of the Night of Qadr':'qadr night',"Retiring to a Mosque for Remembrance of Allah (I'tikaf)":'itikaf','Sales and Trade':'sales trade','Sales in which a Price is paid for Goods to be Delivered Later (As-Salam)':'delivery pay',"Shuf'a":'shufa','Transferance of a Debt from One Person to Another (Al-Hawaala)':'debt transfer','Distribution of Water':'water distribution','Lost Things Picked up by Someone (Luqatah)':'luqatah','Wills and Testaments (Wasaayaa)':'Wasaayaa','Fighting for the Cause of Allah (Jihaad)':'jihaad',
       'One-fifth of Booty to the Cause of Allah (Khumus)':'khumus',
       "Jizyah and Mawaada'ah":'jizyah mawaadaah',
       'Virtues and Merits of the Prophet (pbuh) and his Companions':'virtue prophet',
       'Companions of the Prophet':'prophet companions',
       'Merits of the Helpers in Madinah (Ansaar)':'ansaar',
       'Military Expeditions led by the Prophet (pbuh) (Al-Maghaazi)':'military expedition',
       "Prophetic Commentary on the Qur'an (Tafseer of the Prophet (pbuh))":'tafseer',
       "Virtues of the Qur'an":'quran virtues', 'Wedlock, Marriage (Nikaah)':'nikaah',
       'Sacrifice on Occasion of Birth (`Aqiqa)':'aqiqa','Al-Adha Festival Sacrifice (Adaahi)':'adaahi',
       'Good Manners and Form (Al-Adab)':'adab',
       'To make the Heart Tender (Ar-Riqaq)':'alriqaq', 'Divine Will (Al-Qadar)':'alqadar',
       'Expiation for Unfulfilled Oaths':'unfulfilled oaths',
       "Laws of Inheritance (Al-Faraa'id)":'inheritance laws',
       'Limits and Punishments set by Allah (Hudood)':'limits punishments',
       'Blood Money (Ad-Diyat)':'Blood Money','(Statements made under) Coercion':'coercion','Afflictions and the End of the World':'end of world',
       'Judgments (Ahkaam)':'judgements',
       'Accepting Information Given by a Truthful Person':'information authenticity',
       "Holding Fast to the Qur'an and Sunnah":'fast',
       'Oneness, Uniqueness of Allah (Tawheed)':'oneness'})

    df.drop_duplicates(subset='Hadith',keep='first',inplace=True)
    df.reset_index(inplace=True)
    df.drop('index',axis=1,inplace=True)
    df.Topic=df.Topic.str.lower()
    df['clean']=df['Hadith']
    df['Topic'] = df['Topic'].str.strip()
    import re

    def  clean_text(df, text_field, new_text_field_name):
        df[new_text_field_name] = df[text_field].str.lower()
        df[new_text_field_name] = df[new_text_field_name].apply(lambda elem: re.sub(r"(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?", "", elem))  
        # remove numbers
        df[new_text_field_name] = df[new_text_field_name].apply(lambda elem: re.sub(r"\d+", "", elem))
        return df

    def get_bow_vec(df, id_col):
        cols = [col for col in df.columns if col not in [id_col]]
        feature_set = []
        for row in range(df.shape[0]):
            row_string = []
            for col in cols:
                if isinstance(df.at[row, col], str):
                    row_string.append(df.at[row, col])
                else: 
                    row_string.append('')
            feature_set.append(' '.join(row_string))
        vectorizer = TfidfVectorizer(stop_words=None)
        V = vectorizer.fit_transform(feature_set)
        df = pd.DataFrame(V.toarray(), columns=vectorizer.get_feature_names_out())
        return df

    from pandas.core.frame import DataFrame
    df =clean_text(df,'clean','clean')

    stop = stopwords.words('english')
    df['clean'] = df['clean'].apply(lambda x: ' '.join([word for word in x.split() if word not in (stop)]))

    df['text_tokens'] = df['clean'].apply(lambda x: word_tokenize(x))
    df['text_tokens'] = [' '.join(map(str, l)) for l in df['text_tokens']]
    df.drop_duplicates(subset='text_tokens',inplace=True)
    df=df.reset_index()
    df.drop('index',axis=1,inplace=True)
    df.drop('clean',axis=1,inplace=True)
    df['Topic'] = df['Topic'].str.replace(" ","")
    df['Topic']=df['Topic']+'_top'

    df_tf=get_bow_vec(df,'Hadith')

    def recommendations(usr_input):
        indices = pd.Series(df.Hadith)
        from sklearn.metrics.pairwise import cosine_similarity
        index_hadees=df[df.Hadith==usr_input].index.values[0]
        hadees=df['Hadith'].iloc[index_hadees]
            # # get query index
        q_idx = df.Hadith[df.Hadith ==hadees].index.values[0]
            # #topic of query
        topic=df.iloc[q_idx]['Topic']

            # # # get query from t_matrix using query index
        q=df_tf.iloc[q_idx]
            # get score of matching topic in query vector
        q_score=df_tf.loc[q_idx,topic]
        a=df_tf[df_tf[topic]>0].index
        df_tf.loc[a,topic]=q_score*2
        cosine_sim = cosine_similarity(df_tf)
        print(cosine_sim)
        recommended_movies = []
        topics=[]
        index = indices[indices == usr_input].index.values[0]
        similarity_scores = pd.Series(cosine_sim[index]).sort_values(ascending = False)
        top_10_movies = list(similarity_scores.iloc[1:11].index)
        print(similarity_scores.iloc[1:11])
        for i in top_10_movies:
            recommended_movies.append(list(df.Hadith)[i])
            topics.append(list(df.Topic)[i])
        data=DataFrame(recommended_movies,topics)    
        return recommended_movies,data
    
    x,y = recommendations(usr_input)

    result.clear()
    for i in range(1,5):
        result.append(x[i])










@app.route('/api/post', methods = ['POST'])
def index():
    request_data = request.get_json()
    global usr_input 
    usr_input= str(request_data['message'])
    print(usr_input)
    return {"messade received":"by backend"}


@app.route('/api/get',methods =['GET'])
def create():
    ML()
    hadith = {'Hadiths' : result}
    print(hadith)
    return hadith







if __name__ == "__main__":
    app.run(debug = True)