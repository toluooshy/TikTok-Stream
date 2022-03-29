from moviepy.editor import *
import pygame
import os
import requests

dir_path = os.path.dirname(os.path.realpath(__file__))

pygame.init()

white = (255, 255, 255)
green = (0, 255, 0)
blue = (0, 0, 128)

X = 400
Y = 400

display_surface = pygame.display.set_mode((X, Y))
pygame.display.set_caption('Champion Don Chill Stream')
font = pygame.font.Font('freesansbold.ttf', 32)

inum = 0

while True:
    r = requests.get('http://127.0.0.1:8000/log')
    rr = str(r.json())

    text = font.render(str(rr), True, green, blue)
    textRect = text.get_rect()
    textRect.center = (X // 2, Y // 2)
    display_surface.blit(text, textRect)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            quit()

    pygame.display.update()

    inum += 1
