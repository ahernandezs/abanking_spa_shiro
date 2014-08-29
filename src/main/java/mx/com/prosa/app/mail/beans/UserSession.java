package mx.com.prosa.app.mail.beans;

import java.util.Date;

public class UserSession {
    
    private String clientName;
    private Date last_access_date;
    private String last_access_media;
    
    public String getClientName() {
        return clientName;
    }
    public void setClientName(String clientName) {
        this.clientName = clientName;
    }
    public Date getLast_access_date() {
        return last_access_date;
    }
    public void setLast_access_date(Date last_access_date) {
        this.last_access_date = last_access_date;
    }
    public String getLast_access_media() {
        return last_access_media;
    }
    public void setLast_access_media(String last_access_media) {
        this.last_access_media = last_access_media;
    }

}
