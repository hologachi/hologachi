from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class InnisfreeCrawler(object):
    def __init__(self):
        self.url = "https://www.innisfree.com/kr/ko/Event.do"
        self.driver = webdriver.Chrome("/usr/local/bin/chromedriver")

    def loadPage(self):
        driver = self.driver
        driver.get(self.url)

        itemName = driver.find_elements_by_class_name("evtTit")
        itemDuration = driver.find_elements_by_class_name("evtDate")
        itemProduct = driver.find_elements_by_css_selector("eventListNew>li")
        itemUrl = driver.find_elements_by_css_selector('a')#.get_attribute('href')
        itemImg = driver.find_elements_by_css_selector('img')#.get_attribute('src')

        allData =[]
        i = 0
        for item in itemName:
            allData.append([])
            allData[i].append(item.text)
            i += 1

        i = 0
        for item in itemDuration:
            allData[i].append(item.text)
            i += 1

        # i = 0
        # for item in itemUrl:
        #     allData[i].append(item.text)
        #     i += 1

        # i = 0
        # for item in itemImg:
        #     allData[i].append(item.text)
        #     i += 1

        print(allData)
        # for name in itemName:
        #     for brand in itemBrand:
        #         for url in itemUrl:
        #             allData.append(name.text) 
        


crawler = InnisfreeCrawler()
crawler.loadPage()
